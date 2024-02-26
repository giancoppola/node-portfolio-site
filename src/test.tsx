import React, {useState, useEffect} from 'react';
const ReactDOM = require('react-dom');
// MongoDB model imports
import {UserSchema, UserModel, iUser} from '../server/user';

const UserProfile = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('/api/users')
        .then((res) => {return res.json()})
        .then((data) => {
            console.log(data);
            setUsers(data.users);
        })
    }, [])
    return (
    <div>
        {users.map((user: iUser) => (
            <>
                <h2>{user.firstName} {user.lastName}</h2>
                <p>{user.username}</p>
            </>
        ))}
    </div>
    );
}

ReactDOM.render(<UserProfile/>, document.querySelector('#root'));

