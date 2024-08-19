import { createRoot } from 'react-dom/client'
import { useEffect, useState, Dispatch, StrictMode } from 'react'
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material'

import { CreateRoom } from './_create-room'
import { JoinRoom } from './_join_room'
import { Footer } from './_footer'

import { iPlayer, PlayerModel, PLAYER_ID, ACTIVE, ROOM_JOINED, USER_COUNT, LATEST_DATA, iRoom, EMPTY_ROOM, PLAYERS, CURRENT_STATUS, READY, NOT_READY, PLAYER_1, PLAYER_1_GUESSED, PLAYER_2_GUESSED, PLAYER_2, PLAYER_1_WORD, PLAYER_2_WORD, GAME_FINISH } from '../../types/word-guesser-types'
import { Fetch_Player_CheckPlayerId, Fetch_Player_CreateNewPlayer, GuessChecker, RemoveQuotes } from './word-guesser-tools'

import { io, Socket } from 'socket.io-client'
import { WordInput } from './_word_input'
import { PlayerStatus } from './_player_status'
import { StatusMessage } from './_status_message'
import { GuessHistory } from './guess_history'
const socket: Socket = io();

const Main = () => {
    // State for when in room
    const [currentStatus, setCurrentStatus]: [CURRENT_STATUS, Dispatch<CURRENT_STATUS>] = useState<CURRENT_STATUS>('ROOM_CREATED');
    const [roomData, setRoomData]: [iRoom, Dispatch<iRoom>] = useState<iRoom>(EMPTY_ROOM);
    const [ready, setReady]: [boolean, Dispatch<boolean>] = useState<boolean>(false);
    const [canSubmitWord, setCanSubmitWord]: [boolean, Dispatch<boolean>] = useState<boolean>(true);
    const [word, setWord]: [string, Dispatch<string>] = useState<string>("");
    const [currentGuess, setCurrentGuess]: [string, Dispatch<string>] = useState<string>('');
    const [playerNumber, setPlayerNumber]: [PLAYERS, Dispatch<PLAYERS>] = useState<PLAYERS>('');
    const [showGuessHistory, setShowGuessHistory]: [boolean, Dispatch<boolean>] = useState<boolean>(false);
    // State used at all times
    const [userCount, setUserCount]: [number, Dispatch<number>] = useState<number>(0);
    const [roomName, setRoomName]: [string, Dispatch<string>] = useState<string>("");
    const [playerId, setPlayerId]: [string, Dispatch<string>] = useState<string>("");
    const CheckPlayerId = async (player_id: string) => {
        let valid: boolean = await Fetch_Player_CheckPlayerId(player_id);
        if (valid) {
            setPlayerId(player_id);
        }
        else {
            localStorage.removeItem(PLAYER_ID);
            CreateNewPlayer();
        }
    }
    const CreateNewPlayer = async () => {
        let newId: string = await Fetch_Player_CreateNewPlayer();
        console.log(newId);
        setPlayerId(newId);
        localStorage.setItem(PLAYER_ID, newId);
    }
    const CanSubmitCheck = (room_data: iRoom): boolean => {
        let canSubmit: boolean;
        switch(room_data.current_status) {
            case 'ROOM_CREATED':
                word ? canSubmit = false : canSubmit = true;
                break;
            case 'GAME_READY':
                playerNumber === room_data.current_guesser ? canSubmit = true : canSubmit = false;
                break;
            case 'PLAYER_1_GUESSED':
                playerNumber === PLAYER_2 ? canSubmit = true : canSubmit = false;
                break;
            case 'PLAYER_2_GUESSED':
                playerNumber === PLAYER_1 ? canSubmit = true : canSubmit = false;
                break;
            case 'GAME_FINISH':
                canSubmit = false;
                break;
            default:
                canSubmit = false;
        }
        return canSubmit;
    }
    socket.on(LATEST_DATA, (room_data: iRoom) => {
        console.log('Got new room data:', room_data);
        setRoomData(room_data);
        setCurrentStatus(room_data.current_status);
        setCanSubmitWord(CanSubmitCheck(room_data));
    })
    useEffect(() => {
        let player_id = localStorage.getItem(PLAYER_ID);
        console.log("Player ID: ", player_id);
        if (player_id != null) {
            CheckPlayerId(player_id);
        }
        else {
            CreateNewPlayer();
        }
    }, [])
    useEffect(() => { playerId ? socket.emit(ACTIVE, playerId) : null }, [playerId])
    useEffect(() => { roomName ? socket.emit(ROOM_JOINED, roomName) : null }, [roomName])
    useEffect(() => { ready ? socket.emit(READY, playerId, roomName, word) : socket.emit(NOT_READY, playerId, roomName) }, [ready])
    useEffect(() => {
        if (currentStatus === 'ROOM_CREATED') {
            let guesser = playerNumber === PLAYER_1 ? PLAYER_1_WORD : PLAYER_2_WORD;
            if (word) { setReady(true); setCanSubmitWord(false); socket.emit(guesser, word) }
            else { setReady(false); setCanSubmitWord(true); socket.emit(guesser, '') }
        }
    }, [word])
    useEffect(() => {
        if (currentGuess && canSubmitWord) {
            let test = playerNumber === PLAYER_1 ? PLAYER_2 : PLAYER_1;
            let guesser = playerNumber === PLAYER_1 ? PLAYER_1_GUESSED : PLAYER_2_GUESSED;
            GuessChecker(currentGuess, roomData[test].word) === 4 ?
            socket.emit(GAME_FINISH, playerNumber, roomName) :
            socket.emit(guesser, roomName, currentGuess);
            setCurrentGuess('');
        }
    }, [currentGuess])
    socket.on(USER_COUNT, (user_count: number) => setUserCount(user_count));
    return (
        <Box component='section' display='flex' flexDirection='column' justifyContent='space-between' alignItems='center' height='100dvh' width='100dvw'>
            <Box>
                <Typography variant='h1' fontWeight='bold'>BattleWords</Typography>
                <Typography variant='subtitle2' fontWeight='bold' textAlign='center'>{`${userCount} player${userCount > 1 ? 's are' : ' is'} online`}</Typography>
            </Box>
            { playerId && !roomName &&
                <Box height='100%' display='flex' flexDirection='column' justifyContent='center' gap='2rem'>
                    <CreateRoom setPlayerNumber={setPlayerNumber} setRoomName={setRoomName} playerId={playerId} />
                    <JoinRoom setPlayerNumber={setPlayerNumber} setRoomName={setRoomName} playerId={playerId} />
                </Box>
            }
            { playerId && roomName &&
                <Box height='100%' display='flex' flexDirection='column' justifyContent='space-evenly' gap='2rem'>
                    <Box>
                        <Typography minHeight='3rem' textAlign='center' fontWeight='bold' variant='h4'>
                            { word ? `Your word is ${word.toUpperCase()}` : 'Please submit your word'}
                        </Typography>
                        <PlayerStatus roomData={roomData}/>
                    </Box>
                    <StatusMessage roomData={roomData} currentStatus={currentStatus}/>
                    <WordInput canSubmitWord={canSubmitWord} currentStatus={currentStatus} setCurrentGuess={setCurrentGuess} setWord={setWord}/>
                    <Button onClick={() => {setShowGuessHistory(true)}}>Guess History</Button>
                    <GuessHistory open={showGuessHistory} setOpen={setShowGuessHistory}
                    opp_word={playerNumber === 'player_1' ? roomData.player_2.word : roomData.player_1.word}
                    guesses={playerNumber === 'player_1' ? roomData.player_1.guesses : roomData.player_2.guesses} />
                </Box>
            }
            <Footer/>
        </Box>
    )
}

const root = createRoot(document.getElementById('main')!);
root.render(
    <StrictMode>
        <Main/>
    </StrictMode>
);