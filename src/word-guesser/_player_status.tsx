import { Icon, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Dispatch, useEffect, useState } from "react"
import { Pending, EmojiEvents, HourglassEmpty, ThumbUpAlt } from '@mui/icons-material'
import { iRoom } from "../../types/word-guesser-types";

type PlayerStatus = 'Waiting for player to join' | 'Waiting for player to be ready' | 'Player ready!';

interface PlayerProps {
    name: string;
    playerStatus: PlayerStatus;
}
const Player = (props: PlayerProps) => {
    return (
        <ListItem>
            <ListItemText
                primary={props.name}
                secondary={props.playerStatus}
            />
            <ListItemIcon sx={{ justifyContent: 'center', alignItems: "center", gap: '.5rem' }}>
                <EmojiEvents/> <Typography fontWeight='bold' variant='subtitle2'> 0</Typography>
                </ListItemIcon>
            <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
                { props.playerStatus === 'Waiting for player to join' && <Pending color='action'/> }
                { props.playerStatus === 'Waiting for player to be ready' && <HourglassEmpty color='warning'/> }
                { props.playerStatus === 'Player ready!' && <ThumbUpAlt color='success'/> }
            </ListItemIcon>
        </ListItem>
    )
}

interface PlayerStatusProps {
    roomData: iRoom;
}
export const PlayerStatus = (props: PlayerStatusProps) => {
    const [playerOneStatus, setPlayerOneStatus]: [PlayerStatus, Dispatch<PlayerStatus>] = useState<PlayerStatus>('Waiting for player to join');
    const [playerTwoStatus, setPlayerTwoStatus]: [PlayerStatus, Dispatch<PlayerStatus>] = useState<PlayerStatus>('Waiting for player to join');
    useEffect(() => {
        let room = props.roomData;
        if (room.current_status === "ROOM_CREATED") {
            room.player_1_id && room.player_1.ready && setPlayerOneStatus('Player ready!');
            room.player_1_id && !room.player_1.ready && setPlayerOneStatus('Waiting for player to be ready');
            !room.player_1_id && setPlayerOneStatus('Waiting for player to join');
            room.player_2_id && room.player_2.ready && setPlayerTwoStatus('Player ready!');
            room.player_2_id && !room.player_2.ready && setPlayerTwoStatus('Waiting for player to be ready');
            !room.player_2_id && setPlayerTwoStatus('Waiting for player to join');
        }
    }, [props.roomData])
    return (
        <List>
            <Player name='Player 1' playerStatus={playerOneStatus} />
            <Player name='Player 2' playerStatus={playerTwoStatus} />
        </List>
    )
}