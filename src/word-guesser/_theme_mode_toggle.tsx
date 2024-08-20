import { Brightness7, Brightness4 } from "@mui/icons-material"
import { Box, IconButton } from "@mui/material"

interface Props {
    darkMode: boolean;
    setDarkMode: Function;
}
export const ThemeModeToggle = (props: Props) => {
    return (
        <Box position='absolute' top='0' left='0'>
            <IconButton onClick={() => props.setDarkMode(!props.darkMode)}>
                {props.darkMode && <Brightness7/>}
                {!props.darkMode && <Brightness4/>}
            </IconButton>
        </Box>
    )
}