import { AppBar, Box, Button, createTheme, CssBaseline, List, ListItem, TextField, ThemeProvider, Typography, IconButton } from '@mui/material'
import { FloatingOptions } from './_floating_options'

interface Props {
    darkMode: boolean,
    setDarkMode: Function,
    userCount: number,
}
export const Header = (props: Props) => {
    return (
        <AppBar position='static' color='primary' sx={{padding: {[theme.breakpoints.down('md')]: '2rem 1rem 1rem'}}}>
                <FloatingOptions darkMode={props.darkMode} setDarkMode={props.setDarkMode} />
                <Typography variant='h1' fontWeight='bold' textAlign='center'>BattleWords</Typography>
                <Typography variant='subtitle2' fontWeight='bold' textAlign='center'>{`${props.userCount} player${props.userCount > 1 ? 's are' : ' is'} online`}</Typography>
        </AppBar>
    )
}