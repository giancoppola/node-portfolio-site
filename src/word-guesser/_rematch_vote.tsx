import { Box, Button, Typography } from "@mui/material"

interface Props {
    vote: Function;
}
export const RematchVote = (props: Props) => {
    return (
        <Box>
            <Typography minHeight='3rem' textAlign='center' fontWeight='bold' variant='h4'>
                Want to play again?
            </Typography>
            <Button onClick={() => props.vote('yes')} fullWidth color='success'>Yes</Button>
            <Button onClick={() => props.vote('no')} fullWidth color='error'>No</Button>
        </Box>

    )
}