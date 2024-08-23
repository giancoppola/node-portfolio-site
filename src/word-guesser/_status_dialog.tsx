import { useEffect, useState, Dispatch } from 'react'
import { Box, List, ListItem, TextField, Typography, Dialog, DialogContent, Divider, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material'
import { CURRENT_STATUS, iRoom, PLAYERS } from '../../types/word-guesser-types';

interface Props {
    roomData: iRoom;
    currentStatus: CURRENT_STATUS;
    playerNumber: PLAYERS;
    winner: string;
}
export const StatusDialog = (props: Props) => {
    const [show, setShow]: [boolean, Dispatch<boolean>] = useState<boolean>(false);
    const [contextualMsg, setContextualMsg]: [string, Dispatch<string>] = useState<string>("");
    const [msg, setMsg]: [string, Dispatch<string>] = useState<string>("");
    const ShowDialog = () => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 2000)
    }
    useEffect(() => {
        switch (props.currentStatus) {
            case 'ROOM_CREATED':
                setContextualMsg('');
                setMsg('');
                break;
            case 'GAME_READY':
                setContextualMsg('');
                setMsg(`${props.playerNumber === 'player_1' ? 'You' : 'Player 1'} to guess first!`);
                ShowDialog();
                break;
            case 'PLAYER_1_GUESSED':
                setContextualMsg(props.playerNumber === 'player_1' ?
                `You guessed ${props.roomData.player_1.current_guess.toUpperCase()} which had ${props.roomData.player_1.last_guess_score} matches` :
                `Player 1 guessed ${props.roomData.player_1.current_guess.toUpperCase()} which had ${props.roomData.player_1.last_guess_score} matches`);
                setMsg(`${props.playerNumber === 'player_1' ? "Player 2's" : 'Your'} turn to guess!`);
                ShowDialog();
                break;
            case 'PLAYER_2_GUESSED':
                setContextualMsg(props.playerNumber === 'player_1' ?
                `Player 2 guessed ${props.roomData.player_2.current_guess.toUpperCase()} which had ${props.roomData.player_2.last_guess_score} matches` :
                `You guessed ${props.roomData.player_2.current_guess.toUpperCase()} which had ${props.roomData.player_2.last_guess_score} matches`);
                setMsg(`${props.playerNumber === 'player_1' ? "Your" : "Player 1's"} turn to guess!`);
                ShowDialog();
                break;
            case 'GAME_FINISH':
                setContextualMsg('');
                setMsg(`${props.winner} is the winner!`);
                ShowDialog();
                break;
            case 'ROOM_CLOSING':
                setContextualMsg('');
                props.roomData.player_count < 2 ?
                setMsg('Opponent left! Room is now closing...') :
                setMsg('Rematch denied! Room is now closing...');
                ShowDialog();
                break;
        }
    }, [props.currentStatus])
    return (
        <Dialog open={show}>
            <DialogTitle textAlign='center' margin='1rem'>
                {contextualMsg}
                {contextualMsg && <br/>}
                {contextualMsg && <br/>}
                {msg}
            </DialogTitle>
        </Dialog>
    )
}