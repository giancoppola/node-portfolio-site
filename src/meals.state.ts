import { configureStore, GetState } from '@reduxjs/toolkit';
import Redux, { Action, Store, legacy_createStore, Dispatch, Middleware, applyMiddleware, UnknownAction } from 'redux';
import {ThunkAction, ThunkDispatch, ThunkMiddleware, thunk} from 'redux-thunk';

// action types
export const NEXT = 'NEXT';
export interface QuoteAction extends Action {
    type: string,
    quote: iQuote
}

// states
export const defaultState: iState = {
    author: '',
    quote: '',
    quotes: []
}

// action creators
export const nextQuote = (nextQuote: iQuote) => {
    return {
        type: NEXT,
        quote: nextQuote
    }
}

// API middleware
export interface iQuotes {
    quotes: Array<iQuote>;
}
export interface iQuote {
    author: string,
    quote: string
}
export interface iState {
    author: string,
    quote: string,
    quotes: Array<iQuote>
}
export const GetRandomQuote = () => {
    return async (dispatch: Dispatch, getState: GetState<iState>) => {
        console.log('here');
        let result: Array<iQuote>;
        try{
            console.log('here now')
            await fetch(QUOTE_URL)
            .then((res: Response) => {
                return res.json();
            })
            .then((data: iQuotes) => {
                result = data.quotes;
                console.log(result);
            })
        }
        catch(e){
            console.log(e);
            return
        }
        dispatch(nextQuote(result[GetRandomIndex(result.length)]))
    }
}

// reducer
const reducer = (state = defaultState, action: QuoteAction) => {
    switch(action.type){
        case NEXT:
            let newQuotes = [...state.quotes]
            newQuotes.push(action.quote);
            return {
                author: action.quote.author,
                quote: action.quote.quote,
                quotes: newQuotes
            }
    }
    return defaultState;
}

const thunkMiddleware = applyMiddleware(thunk)
const store = configureStore({
    reducer: {
        posts: postsReducer,
        comments: commentsReducer,
        users: usersReducer,
    },
})

export default store;

