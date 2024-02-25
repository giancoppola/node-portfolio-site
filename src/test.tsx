import * as React from 'react';
const ReactDOM = require('react-dom');
// MongoDB model imports
import {User} from '../server/models';

class App extends React.Component{
    static Title(){
        return <h1>This is a title</h1>
        User.Model
    }
    static async Users(){
        let users: Array<Object> = await fetch('/api/users').then((res) => res.json());
        for (let user in users){
            <App.User/>
        }
    }
    static User(){
        return <p>User found</p>
    }
    constructor(props: any){
        super(props);
    }
    render(){
        return <>
            <App.Title/>
        </>
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'));

