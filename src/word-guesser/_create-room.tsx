import { Dispatch, useState } from 'react'
import { Box, List, ListItem, TextField, Typography } from '@mui/material'

export const CreateRoom = () => {
    const [roomName, setRoomName]: [string, Dispatch<string>] = useState<string>("")
    return (
        <Box height='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <Typography variant='h2'>Create a room</Typography>
            <List>
                <ListItem>
                    <TextField fullWidth={true} label="Room Name" value={roomName} onChange={(e) => setRoomName(e.target.value)}/>
                </ListItem>
            </List>
        </Box>
    )
}