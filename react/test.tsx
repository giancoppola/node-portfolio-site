import * as React from 'react';
const ReactDOM = require('react-dom');

class App extends React.Component{
    static Title(){
        return <h1>This is a title</h1>
    }
    constructor(props: any){
        super(props);
    }
    render(){
        <>
            <App.Title/>
        </>
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'));

