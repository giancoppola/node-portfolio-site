import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
const store: Store = require('./meals.state').default;
import {} from './meals.state';
import {ConnectedProps, MapStateToProps, Provider, connect} from 'react-redux';
import React, {useState, useEffect} from 'react';
import { useQuery } from 'react-query';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'

const AppWrapper = (props: any) => {
    return (
        <>
            <p>Hello World!</p>
        </>
    )
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<AppWrapper/>);