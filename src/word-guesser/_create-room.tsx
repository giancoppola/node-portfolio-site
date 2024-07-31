import { Dispatch, useEffect, useState } from 'react'
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material'
import { RemoveQuotes } from './word-guesser-tools'

interface Props {
    playerId: string;
}
export const CreateRoom = (props: Props) => {
    const [errMsg, setErrMsg]: [string, Dispatch<string>] = useState<string>("");
    const [roomName, setRoomName]: [string, Dispatch<string>] = useState<string>("");
    const CheckRoom = async (room_name: string) => {
        if (!room_name) { setErrMsg('Please provide a room name!'); return; }
        let inUse: string;
        await fetch(`/api/word-guesser/rooms/find?name=${room_name}`)
        .then(res => res.text())
        .then(data => {
            inUse = RemoveQuotes(data);
            if (inUse === 'true') {
                setErrMsg("Room with that name already exists!");
                return;
            }
            else {
                CreateRoom();
            }
        })
    }
    const CreateRoom = async () => {
        await fetch(`/api/word-guesser/rooms/new?name=${roomName}&id=${props.playerId}`, {
            method: "POST"
        })
        .then((res => res.redirected))
    }
    useEffect(() => { setErrMsg('') }, [roomName])
    return (
        <Box height='100%' display='flex' flexDirection='column' justifyContent='center'>
            <Typography variant='h3'>Create a room</Typography>
            <List>
                <ListItem sx={{ gap: '1rem', paddingLeft: 0 }}>
                    <TextField error={errMsg ? true : false} fullWidth={true} label="Room Name" value={roomName} onChange={(e) => setRoomName(e.target.value)}/>
                    <Button className='btn__input' variant='contained' onClick={() => CheckRoom(roomName)}>Create</Button>
                </ListItem>
            </List>
            <Typography minHeight='1.5rem' color='red'>{errMsg}</Typography>
        </Box>
    )
}