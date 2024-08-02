import { Dispatch, useEffect, useState } from 'react'
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material'
import { RemoveQuotes, Room_DoesRoomExist, Room_CreateRoom } from './word-guesser-tools'
import { WordInput } from './_word_input';

interface Props {
    setWord: Function;
}
export const Room = (props: Props) => {
    return (
        <WordInput setWord={props.setWord}/>
    )
}