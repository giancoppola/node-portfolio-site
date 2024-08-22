import { Button } from '@mui/material'
import { History } from '@mui/icons-material';
import { CURRENT_STATUS } from '../../types/word-guesser-types';

interface Props {
    currentStatus: CURRENT_STATUS;
    showHistory: Function;
}
export const GuessHistoryButton = (props: Props) => {
    return (
        <Button disabled={props.currentStatus === 'ROOM_CREATED' || props.currentStatus === 'GAME_FINISH'
        || props.currentStatus === 'ROOM_CLOSING' ? true : false}
        fullWidth onClick={() => props.showHistory(true)}>
            <History />
            &nbsp; Guess History
        </Button>
    )
}