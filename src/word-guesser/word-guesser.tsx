import { createRoot } from 'react-dom/client'
import { useEffect, useState, Dispatch } from 'react'

import { Box, List, ListItem, TextField, Typography } from '@mui/material'
import { CreateRoom } from './_create-room'
import { Footer } from './_footer'

import { iPlayer, PlayerModel, PLAYER_ID } from '../../types/word-guesser-types'
import { RemoveQuotes } from './word-guesser-tools'

import { io, Socket } from 'socket.io-client'
const socket: Socket = io();

const Main = () => {
    const [playerId, setPlayerId]: [string, Dispatch<string>] = useState<string>("");
    const CheckPlayerId = async (player_id: string) => {
        let valid: string;
        await fetch(`/api/word-guesser/players/find?id=${player_id}`)
        .then(res => res.text())
        .then(data => {
            valid = RemoveQuotes(data);
            if (valid === 'true') {
                setPlayerId(player_id);
            }
            else {
                localStorage.removeItem(PLAYER_ID);
                CreateNewPlayer();
            }
        })
    }
    const CreateNewPlayer = async () => {
        let newId: string;
        await fetch("/api/word-guesser/players/new", {
            method: "POST"
        })
        .then(res => res.text())
        .then(id => {
            newId = RemoveQuotes(id);
            console.log(newId);
            setPlayerId(newId);
            localStorage.setItem(PLAYER_ID, newId);
        })
    }
    useEffect(() => {
        let player_id = localStorage.getItem(PLAYER_ID);
        console.log("Player ID: ", player_id)
        if (player_id != null) {
            CheckPlayerId(player_id);
        }
        else {
            CreateNewPlayer();
        }
    }, [])
    useEffect(() => { playerId ? socket.emit("active", playerId) : null; }, [playerId])
    return (
        <Box component='section' display='flex' flexDirection='column' justifyContent='flex-start' alignItems='center' height='100dvh' width='100dvw'>
            <Typography variant='h1'>Word Guesser</Typography>
            { playerId && <CreateRoom playerId={playerId} /> }
            <Footer/>
        </Box>
    )
}

const root = createRoot(document.getElementById('main')!);
root.render(<Main/>);