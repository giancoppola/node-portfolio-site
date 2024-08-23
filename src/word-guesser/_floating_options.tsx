import { Brightness7, Brightness4, Help } from "@mui/icons-material"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material"
import { Dispatch, useState } from "react";

interface Props {
    darkMode: boolean;
    setDarkMode: Function;
}
export const FloatingOptions = (props: Props) => {
    const [openHelp, setOpenHelp]: [boolean, Dispatch<boolean>] = useState<boolean>(false);
    return (
        <>
            <Box position='absolute' top='0' left='0'>
                <IconButton onClick={() => props.setDarkMode(!props.darkMode)}>
                    {props.darkMode && <Brightness7/>}
                    {!props.darkMode && <Brightness4/>}
                </IconButton>
                <IconButton onClick={() => setOpenHelp(true)}>
                    <Help/>
                </IconButton>
            </Box>
            <Dialog open={openHelp}>
                <DialogTitle fontWeight='bold'>
                    How To Play
                </DialogTitle>
                <DialogContent dividers sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <DialogContentText>
                        BattleWords is a two player game where the aim is to beat your
                        opponent by guessing their word!
                    </DialogContentText>
                    <DialogContentText>
                        At the start of the game, you and your opponent will both submit a word,
                        and then take turns guessing your opponents word.
                    </DialogContentText>
                    <DialogContentText>
                        Every time you or your opponent guess you will be told how many characters
                        of your guess match the same character position in your opponents word.
                    </DialogContentText>
                    <DialogContentText>
                        The first person to figure out their opponents word wins!
                    </DialogContentText>
                    <DialogContentText>
                        To get started, either create a new room and invite a friend,
                        or join an existing room!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenHelp(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}