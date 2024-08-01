import { createRoot } from 'react-dom/client'
import { useEffect, useState, Dispatch } from 'react'
import { Box, List, ListItem, TextField, Typography } from '@mui/material'

import { CreateRoom } from './_create-room'
import { JoinRoom } from './_join_room'
import { Room } from './_room'
import { Footer } from './_footer'

import { iPlayer, PlayerModel, PLAYER_ID, ROOM_NAME, SET_WORD, NEXT_GUESS } from '../../types/word-guesser-types'
import { Player_CheckPlayerId, Player_CreateNewPlayer, RemoveQuotes } from './word-guesser-tools'

import { io, Socket } from 'socket.io-client'
const socket: Socket = io();

const Main = () => {
    const [roomName, setRoomName]: [string, Dispatch<string>] = useState<string>("");
    const [playerId, setPlayerId]: [string, Dispatch<string>] = useState<string>("");
    const CheckPlayerId = async (player_id: string) => {
        let valid: boolean = await Player_CheckPlayerId(player_id);
        if (valid) {
            setPlayerId(player_id);
        }
        else {
            localStorage.removeItem(PLAYER_ID);
            CreateNewPlayer();
        }
    }
    const CreateNewPlayer = async () => {
        let newId: string = await Player_CreateNewPlayer();
        console.log(newId);
        setPlayerId(newId);
        localStorage.setItem(PLAYER_ID, newId);
    }
    useEffect(() => {
        let player_id = localStorage.getItem(PLAYER_ID);
        let room_name = localStorage.getItem(ROOM_NAME);
        console.log("Player ID: ", player_id);
        console.log("Room Name", room_name);
        if (player_id != null) {
            CheckPlayerId(player_id);
        }
        else {
            CreateNewPlayer();
        }
        if (room_name != null) {
            
        }
    }, [])
    useEffect(() => { playerId ? socket.emit("active", playerId) : null }, [playerId])
    useEffect(() => { roomName ? socket.emit("room_joined", roomName ) : null }, [roomName])
    return (
        <Box component='section' display='flex' flexDirection='column' justifyContent='space-between' alignItems='center' height='100dvh' width='100dvw'>
            <Typography variant='h1' fontWeight='bold'>BattleWords</Typography>
            { playerId && !roomName &&
                <Box height='100%' display='flex' flexDirection='column' justifyContent='center' gap='2rem'>
                    <CreateRoom setRoomName={setRoomName} playerId={playerId} />
                    <JoinRoom setRoomName={setRoomName} playerId={playerId} />
                </Box>
            }
            { roomName &&
                <Box height='100%' display='flex' flexDirection='column' justifyContent='center' gap='2rem'>
                    <Room/>
                </Box>
            }
            <Footer/>
        </Box>
    )
}

const root = createRoot(document.getElementById('main')!);
root.render(<Main/>);