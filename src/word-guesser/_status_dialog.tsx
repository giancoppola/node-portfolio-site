import { useEffect, useState, Dispatch } from 'react'
import { Box, List, ListItem, TextField, Typography, Dialog, DialogContent, Divider, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material'
import { CURRENT_STATUS, PLAYERS } from '../../types/word-guesser-types';

interface Props {
    currentStatus: CURRENT_STATUS;
    playerNumber: PLAYERS;
    winner: string;
}
export const StatusDialog = (props: Props) => {
    const [show, setShow]: [boolean, Dispatch<boolean>] = useState<boolean>(false);
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
                break;
            case 'GAME_READY':
                setMsg(`${props.playerNumber === 'player_1' ? 'You' : 'Player 1'} to guess first!`);
                ShowDialog();
                break;
            case 'PLAYER_1_GUESSED':
                setMsg(`${props.playerNumber === 'player_1' ? "Player 2's" : 'Your'} turn to guess!`);
                ShowDialog();
                break;
            case 'PLAYER_2_GUESSED':
                setMsg(`${props.playerNumber === 'player_1' ? "Your" : "Player 1's"} turn to guess!`);
                ShowDialog();
                break;
            case 'GAME_FINISH':
                setMsg(`${props.winner} is the winner!`);
                ShowDialog();
                break;
            case 'ROOM_CLOSING':
                setMsg('Rematch denied! Room is now closing...');
                ShowDialog();
                break;
        }
    }, [props.currentStatus])
    return (
        <Dialog open={show}>
            <DialogTitle>
                {msg}
            </DialogTitle>
            {/* <DialogActions>
                <Button onClick={() => setShow(false)}>Close</Button>
            </DialogActions> */}
        </Dialog>
    )
}