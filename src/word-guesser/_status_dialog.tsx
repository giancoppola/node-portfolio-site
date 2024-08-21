import { useEffect, useState, Dispatch } from 'react'
import { Box, List, ListItem, TextField, Typography, Dialog, DialogContent, Divider, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material'
import { CURRENT_STATUS } from '../../types/word-guesser-types';

interface Props {
    msg: string;
    show: boolean;
    setShow: Function;
}
export const StatusDialog = (props: Props) => {
    return (
        <Dialog open={props.show}>
            <DialogTitle>
                {props.msg}
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => props.setShow(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}