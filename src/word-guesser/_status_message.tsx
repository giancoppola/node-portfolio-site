import { Typography } from "@mui/material"
import { CURRENT_STATUS, PLAYERS } from "../../types/word-guesser-types";

interface Props {
    currentStatus: CURRENT_STATUS;
    word: string;
    winner: string;
}
export const StatusMessage = (props: Props) => {
    return (
        <Typography minHeight='3rem' textAlign='center' fontWeight='bold' variant='h4'>
            { props.currentStatus != 'GAME_FINISH' && props.word &&
                `Your word is ${props.word.toUpperCase()}`
            }
            { props.currentStatus != 'GAME_FINISH' && !props.word &&
                'Please submit your word'
            }
            { props.currentStatus === 'GAME_FINISH' &&
                `${props.winner} is the winner!`
            }
        </Typography>
    )
}