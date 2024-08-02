import { Dispatch, useEffect, useState } from 'react'
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material'
import { RemoveQuotes, Room_DoesRoomExist, Room_CreateRoom } from './word-guesser-tools'
import { PLAYER_1 } from '../../types/word-guesser-types';

interface Props {
    playerId: string;
    setRoomName: Function;
    setPlayerNumber: Function;
}
export const CreateRoom = (props: Props) => {
    const [errMsg, setErrMsg]: [string, Dispatch<string>] = useState<string>("");
    const [newRoomName, setNewRoomName]: [string, Dispatch<string>] = useState<string>("");
    const CheckRoom = async (room_name: string) => {
        if (!room_name) { setErrMsg('Please provide a room name!'); return; }
        let room_exists = await Room_DoesRoomExist(room_name);
        if (room_exists) { setErrMsg("Room with that name already exists!"); return; }
        let room_created = await Room_CreateRoom(room_name, props.playerId);
        if (room_created) {
            props.setRoomName(room_name);
            props.setPlayerNumber(PLAYER_1);
        }
        else { console.log('room not created'); }
    }
    useEffect(() => { setErrMsg('') }, [newRoomName])
    return (
        <Box>
            <Typography variant='h3'>Create a room</Typography>
            <List>
                <ListItem sx={{ gap: '1rem', paddingLeft: 0 }}>
                    <TextField error={errMsg ? true : false} fullWidth={true} label="Room Name" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)}/>
                    <Button className='btn__input' variant='contained' onClick={() => CheckRoom(newRoomName)}>Create</Button>
                </ListItem>
            </List>
            <Typography minHeight='1.5rem' color='red'>{errMsg}</Typography>
        </Box>
    )
}