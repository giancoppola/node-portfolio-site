import { useEffect, useState, Dispatch } from 'react'
import { Box, List, ListItem, TextField, Typography, Dialog, DialogContent, Divider, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material'

import { GuessChecker } from './word-guesser-tools'

interface Props {
    open: boolean,
    setOpen: Function,
    opp_word: string,
    guesses: Array<string>
}
export const GuessHistoryDialog = (props: Props) => {
    return (
        <Dialog open={props.open}>
            <DialogTitle>Guess History</DialogTitle>
            <DialogContent dividers>
                <List>
                    { props.guesses.length < 1 &&
                        <ListItem>
                            <DialogContentText>
                                No guesses yet...
                            </DialogContentText>
                        </ListItem>
                    }
                    { props.guesses.length >= 1 &&
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
                    }
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {props.setOpen(false)}}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}