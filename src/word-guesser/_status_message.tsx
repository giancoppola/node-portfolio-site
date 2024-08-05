import { Dispatch, useEffect, useState } from "react";
import { CURRENT_STATUS, iRoom } from "../../types/word-guesser-types"
import { Typography } from "@mui/material";

interface Props {
    roomData: iRoom;
    currentStatus: CURRENT_STATUS;
}
export const StatusMessage = (props: Props) => {
    const [countdownString, setCountdownString]: [string, Dispatch<string>] = useState<string>('Game begins in 5...');
    useEffect(() => {
        let room = props.roomData;
    }, [props.roomData])
    return (
        <Typography>
            { props.currentStatus === 'ROOM_CREATED' && props.roomData.player_1.ready && props.roomData.player_2.ready &&
                countdownString
            }
            { props.currentStatus === 'GAME_READY' &&
                "Player 1's turn to guess"
            }
        </Typography>
    )
}