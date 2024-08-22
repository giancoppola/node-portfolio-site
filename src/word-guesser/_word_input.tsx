import { Dispatch, useEffect, useState } from 'react'
import { Box, Button, Input, InputBaseComponentProps, List, ListItem, OutlinedInput, StyledComponentProps, SxProps, TextField, Typography } from '@mui/material'
import { RemoveQuotes, Fetch_Room_DoesRoomExist, Fetch_Room_CreateRoom } from './word-guesser-tools'
import { CURRENT_STATUS, WORD_SET } from '../../types/word-guesser-types';


interface Props {
    canSubmitWord: boolean;
    currentStatus: CURRENT_STATUS;
    setWord: Function;
    setCurrentGuess: Function;
}
export const WordInput = (props: Props) => {
    const [wordSet, setWordSet]: [WORD_SET, Dispatch<WORD_SET>] = useState({});
    const [errMsg, setErrMsg]: [string, Dispatch<string>] = useState<string>("");
    const [letterOne, setLetterOne]: [string, Dispatch<string>] = useState<string>("");
    const [letterTwo, setLetterTwo]: [string, Dispatch<string>] = useState<string>("");
    const [letterThree, setLetterThree]: [string, Dispatch<string>] = useState<string>("");
    const [letterFour, setLetterFour]: [string, Dispatch<string>] = useState<string>("");
    const HandleChange = (value: string, element: string) => {
        switch(element) {
            case 'letter-one':
                setLetterOne(value);
                document.getElementById("letter-two")?.focus();
                break;
            case 'letter-two':
                setLetterTwo(value);
                document.getElementById("letter-three")?.focus();
                break;
            case 'letter-three':
                setLetterThree(value);
                document.getElementById("letter-four")?.focus();
                break;
            case 'letter-four':
                setLetterFour(value);
                break;
        }
    }
    const UpdateWord = () => {
        let word = letterOne + letterTwo + letterThree + letterFour;
        console.log(wordSet[word]);
        if (word.length === 4) {
            if (wordSet[word] != null) {
                props.currentStatus === 'ROOM_CREATED' ? props.setWord(word) : props.setCurrentGuess(word);
                setErrMsg('');
                setLetterOne('');
                setLetterTwo('');
                setLetterThree('');
                setLetterFour('');
            }
            else {
                setErrMsg('Not a valid word!');
            }
        }
        else {
            setErrMsg('Please provide a four letter word!');
        }
    }
    const CancelReady = () => {
        props.setWord('');
    }
    useEffect(() => { setErrMsg('') }, [letterOne, letterTwo, letterThree, letterFour])
    useEffect(() => {
        fetch('/JSON/four-letter-words.json')
        .then(res => res.json())
        .then(data => setWordSet(data))
        .catch((e) => console.log(e))
    }, [])
    const InputStyles: React.CSSProperties = { width: '5rem', height: '5rem', fontSize: '5rem', textAlign: 'center' }
    const InputProps: InputBaseComponentProps = { maxLength: 1, style: InputStyles }
    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='1rem'>
            <Box display='flex' gap='1rem'>
                <TextField disabled={!props.canSubmitWord} id='letter-one' inputProps={InputProps} value={letterOne} onChange={(e) => HandleChange(e.target.value, 'letter-one')} />
                <TextField disabled={!props.canSubmitWord} id='letter-two' inputProps={InputProps} value={letterTwo} onChange={(e) => HandleChange(e.target.value, 'letter-two')} />
                <TextField disabled={!props.canSubmitWord} id='letter-three' inputProps={InputProps} value={letterThree} onChange={(e) => HandleChange(e.target.value, 'letter-three')} />
                <TextField disabled={!props.canSubmitWord} id='letter-four' inputProps={InputProps} value={letterFour} onChange={(e) => HandleChange(e.target.value, 'letter-four')} />
            </Box>
            { props.canSubmitWord && <Button disabled={!props.canSubmitWord} variant='outlined' onClick={UpdateWord} color={errMsg ? 'error' : 'primary'}>{props.currentStatus === 'ROOM_CREATED' ? 'Submit' : 'Guess'}</Button>}
            { !props.canSubmitWord && props.currentStatus === 'ROOM_CREATED' && <Button variant='outlined' onClick={CancelReady} color={'error'}>Cancel</Button>}
            <Typography sx={{minHeight: '1.5rem', color: 'red'}} variant='subtitle2' fontWeight='bold'>{errMsg}</Typography>
        </Box>
    )
}