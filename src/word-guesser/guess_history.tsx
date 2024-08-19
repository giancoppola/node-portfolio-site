import { useEffect, useState, Dispatch } from 'react'
import { Box, List, ListItem, TextField, Typography, Dialog, DialogContent, Divider, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material'

import { iPlayer, PlayerModel, PLAYER_ID, ACTIVE, ROOM_JOINED, USER_COUNT, LATEST_DATA, iRoom, EMPTY_ROOM, PLAYERS, CURRENT_STATUS, READY, NOT_READY, PLAYER_1, PLAYER_1_GUESSED, PLAYER_2_GUESSED, PLAYER_2, PLAYER_1_WORD, PLAYER_2_WORD } from '../../types/word-guesser-types'
import { GuessChecker } from './word-guesser-tools'

interface Props {
    open: boolean,
    setOpen: Function,
    opp_word: string,
    guesses: Array<string>
}
export const GuessHistory = (props: Props) => {
    return (
        <Dialog open={props.open}>
            <DialogTitle>Guess History</DialogTitle>
            <DialogContent dividers>
                <List>
                    <>
                        {props.guesses.map((guess) => {
                            return (
                                <ListItem>
                                    <DialogContentText>
                                        {guess}: {GuessChecker(guess, props.opp_word)} {GuessChecker(guess, props.opp_word) === 4 ? '- WINNER!' : ''}
                                    </DialogContentText>
                                </ListItem>
                            )
                        })}
                    </>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {props.setOpen(false)}}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}