import { Button } from '@mui/material'
import { Logout } from '@mui/icons-material';

interface Props {
    leaveRoom: Function;
}
export const LeaveRoomButton = (props: Props) => {
    return (
        <Button fullWidth color='error' onClick={() => props.leaveRoom()}>
            <Logout color='error'/>
            &nbsp; Leave Room
        </Button>
    )
}