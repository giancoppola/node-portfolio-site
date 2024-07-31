import { Dispatch, useState } from 'react'
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material'

export const Footer = () => {
    return (
        <Box display='flex' justifyContent='center' alignItems='center' gap='1rem'>
            <Typography variant='subtitle2'>created by <Typography fontWeight='bold' variant='subtitle2' component='span'>melliek</Typography></Typography>
            <Typography variant='subtitle2'>coded by <Typography fontWeight='bold' variant='subtitle2' component='span'>gianc</Typography></Typography>
        </Box>
    )
}