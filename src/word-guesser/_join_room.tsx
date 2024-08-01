import { Dispatch, useEffect, useState } from 'react'
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material'
import { RemoveQuotes, Room_DoesRoomExist, Room_JoinRoom } from './word-guesser-tools'
import { SuccessResponse } from '../../types/word-guesser-types';

interface Props {
    playerId: string;
    setRoomName: Function;
}
export const JoinRoom = (props: Props) => {
    const [errMsg, setErrMsg]: [string, Dispatch<string>] = useState<string>("");
    const [newRoomName, setNewRoomName]: [string, Dispatch<string>] = useState<string>("");
    const CheckRoom = async (room_name: string) => {
        if (!room_name) { setErrMsg('Please provide a room name!'); return; }
        let room_exists = await Room_DoesRoomExist(room_name);
        if (!room_exists) { setErrMsg("No room with that name exists!"); return; }
        JoinRoom(room_name);
    }
    const JoinRoom = async (room_name: string) => {
        let joined: SuccessResponse = await Room_JoinRoom(room_name, props.playerId);
        if (joined.success) {
            props.setRoomName(room_name);
        }
        else {
            setErrMsg(joined.msg);
        }
    }
    useEffect(() => { setErrMsg('') }, [newRoomName])
    return (
        <Box>
            <Typography variant='h3'>Join a room</Typography>
            <List>
                <ListItem sx={{ gap: '1rem', paddingLeft: 0 }}>
                    <TextField error={errMsg ? true : false} fullWidth={true} label="Room Name" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)}/>
                    <Button className='btn__input' variant='contained' onClick={() => CheckRoom(newRoomName)}>Join</Button>
                </ListItem>
            </List>
            <Typography minHeight='1.5rem' color='red'>{errMsg}</Typography>
        </Box>
    )
}