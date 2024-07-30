import { createRoot } from 'react-dom/client'
import { Typography } from '@mui/material'

const CreateRoom = () => {
    return (
        <>
            <Typography variant='h2'>Create a room</Typography>
        </>
    )
}

const Main = () => {
    return (
        <>
            <Typography variant='h1'>Word Guesser</Typography>
            <CreateRoom/>
        </>
    )
}



const root = createRoot(document.getElementById('main')!);
root.render(<Main/>);