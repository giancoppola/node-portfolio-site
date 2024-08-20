import { Button } from '@mui/material'
import { History } from '@mui/icons-material';

interface Props {
    showHistory: Function;
}
export const GuessHistoryButton = (props: Props) => {
    return (
        <Button fullWidth onClick={() => props.showHistory(true)}>
            <History />
            &nbsp; Guess History
        </Button>
    )
}