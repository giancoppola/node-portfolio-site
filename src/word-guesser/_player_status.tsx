import { Icon, Link, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material"
import { Dispatch, useEffect, useState } from "react"
import { Pending, EmojiEvents, HourglassEmpty, ThumbUpAlt, Share } from '@mui/icons-material'
import { iRoom } from "../../types/word-guesser-types";
import { set } from "mongoose";

interface PlayerProps {
    roomName: string;
    name: string;
    icon: StatusIcon;
    playerStatus: string;
    wins: number;
}
const Player = (props: PlayerProps) => {
    const [tooltip, setTooltip]: [string, Dispatch<string>] = useState<string>("Click to copy share link...");
    const SaveLinkToClipboard = () => {
        let joinUrl = location.href + `?join=${props.roomName}`;
        try {
            navigator.clipboard.writeText(joinUrl);
            console.log(`copied ${joinUrl} to clipboard`);
            setTooltip("Join link copied to clipboard!");
            setTimeout(() => {setTooltip("Click to copy share link...")}, 2000);
        }
        catch (e) {
            console.error(e);
        }
    }
    return (
        <ListItem>
            <ListItemText
                primary={props.name}
                secondary={props.playerStatus}
            />
            <ListItemIcon sx={{ justifyContent: 'center', alignItems: "center", gap: '.5rem' }}>
                <EmojiEvents/> <Typography fontWeight='bold' variant='subtitle2'>{props.wins}</Typography>
                </ListItemIcon>
            <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
                { props.icon === 'pending' &&
                    <Tooltip placement="bottom" arrow title={tooltip}>
                        <Link style={{cursor: "pointer"}} component='button' onClick={SaveLinkToClipboard}>
                            <Share color='action'/>
                        </Link>
                    </Tooltip>
                }
                { props.icon === 'hourglass' && <HourglassEmpty color='warning'/> }
                { props.icon === 'thumbs_up' && <ThumbUpAlt color='success'/> }
            </ListItemIcon>
        </ListItem>
    )
}

type StatusIcon = 'pending' | "hourglass" | 'thumbs_up';
interface PlayerStatusProps {
    roomData: iRoom;
}
export const PlayerStatus = (props: PlayerStatusProps) => {
    const [playerOneStatus, setPlayerOneStatus]: [string, Dispatch<string>] = useState<string>('Waiting for player to join...');
    const [playerOneIcon, setPlayerOneIcon]: [StatusIcon, Dispatch<StatusIcon>] = useState<StatusIcon>('pending');
    const [playerTwoStatus, setPlayerTwoStatus]: [string, Dispatch<string>] = useState<string>('Waiting for player to join...');
    const [playerTwoIcon, setPlayerTwoIcon]: [StatusIcon, Dispatch<StatusIcon>] = useState<StatusIcon>('pending');
    useEffect(() => {
        let room = props.roomData;
        switch (room.current_status) {
            case "ROOM_CREATED":
                if (room.player_1_id && room.player_1.ready) { setPlayerOneStatus('Player ready! Waiting for game start...'); setPlayerOneIcon('thumbs_up'); }
                if (room.player_1_id && !room.player_1.ready) { setPlayerOneStatus('Waiting for player to be ready...'); setPlayerOneIcon('hourglass'); }
                if (!room.player_1_id) { setPlayerOneStatus('Waiting for player to join...'); setPlayerOneIcon('pending'); }
                if (room.player_2_id && room.player_2.ready) { setPlayerTwoStatus('Player ready! Waiting for game start...'); setPlayerTwoIcon('thumbs_up'); }
                if (room.player_2_id && !room.player_2.ready) { setPlayerTwoStatus('Waiting for player to be ready...'); setPlayerTwoIcon('hourglass'); }
                if (!room.player_2_id) { setPlayerTwoStatus('Waiting for player to join...'); setPlayerTwoIcon('pending'); }
                break;
            case "GAME_READY":
                setPlayerOneStatus('Now guessing...');
                setPlayerOneIcon('hourglass');
                setPlayerTwoStatus('Waiting for Player 1 to guess...');
                setPlayerTwoIcon('pending');
                break;
            case "PLAYER_1_GUESSED":
                setPlayerOneStatus(`Guessed ${room.player_1.current_guess.toUpperCase()}. Waiting for Player 2 to guess...`);
                setPlayerOneIcon('pending');
                setPlayerTwoStatus('Now guessing...');
                setPlayerOneIcon('hourglass');
                break;
            case "PLAYER_2_GUESSED":
                setPlayerTwoStatus(`Guessed ${room.player_2.current_guess.toUpperCase()}. Waiting for Player 2 to guess...`);
                setPlayerTwoIcon('pending');
                setPlayerOneStatus('Now guessing...');
                setPlayerOneIcon('hourglass');
                break;
            case "GAME_FINISH":
                if (!room.player_2.rematch) {
                    setPlayerTwoStatus(`Waiting for player to vote...`);
                    setPlayerTwoIcon('hourglass');
                }
                else if (room.player_2.rematch === 'no') {
                    setPlayerTwoStatus(`Player does not want a rematch!`);
                    setPlayerTwoIcon('pending');
                }
                else if (room.player_2.rematch === 'yes') {
                    setPlayerTwoStatus(`Player wants a rematch!`);
                    setPlayerTwoIcon('thumbs_up');
                }
                if (!room.player_1.rematch) {
                    setPlayerOneStatus(`Waiting for player to vote...`);
                    setPlayerOneIcon('hourglass');
                }
                else if (room.player_1.rematch === 'no') {
                    setPlayerOneStatus(`Player does not want a rematch!`);
                    setPlayerOneIcon('pending');
                }
                else if (room.player_1.rematch === 'yes') {
                    setPlayerOneStatus(`Player wants a rematch!`);
                    setPlayerOneIcon('thumbs_up');
                }
                break;
        }
    }, [props.roomData])
    return (
        <List>
            <Player roomName={props.roomData.room_name} name='Player 1' wins={props.roomData.player_1.wins} icon={playerOneIcon} playerStatus={playerOneStatus} />
            <Player roomName={props.roomData.room_name} name='Player 2' wins={props.roomData.player_2.wins} icon={playerTwoIcon} playerStatus={playerTwoStatus} />
        </List>
    )
}