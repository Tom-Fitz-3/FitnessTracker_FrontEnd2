import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../api';
import handleToken from '../api/token';
import "../style/components.css"

const Register = ({setSavedToken}) => {

    let history = useHistory();
    const [createUser, setCreateUser] = useState({"username": '', "password": ''});
    const [confirmPassword, setConfirmPassword] = useState({confirmPassword: ''})

    async function createServerToken() {
        try {
            const user = {...createUser}
            const newUser = user;
            const data = await api.makeRequest('/users/register', 'POST', newUser);
            handleToken.saveToken(data.token);
            setSavedToken(handleToken.grabToken());
            history.push('/home');
        } catch (error) {
            console.log(error);
        }
    }

    async function onSubmit(event) {
        event.preventDefault();
        console.log(createUser.username);
        if (createUser.username.length < 1 || createUser.password.length < 1) {
            alert('username/Password must not be empty');
        }
        else if (createUser.username.length < 5 || createUser.password.length < 5) {
            alert('username/Password must be longer than 5 characters');
        }
        else if (createUser.username.length > 15 || createUser.password.length > 15) {
            alert('username/Password must be less than 16 characters');
        }
        else if (createUser.password !== confirmPassword.confirmPassword) {
            alert('Password must be the same in both fields');
        }
        else {
            createServerToken();
        }

    }

    function handleInput(event) {
        if (event.target.attributes['name'].value !== 'confirmPassword') {
            const createUserKey = event.target.attributes['name'].value;
            const newState = {...createUser};
            newState[createUserKey] = event.target.value;
            setCreateUser(newState);
        }
        else {
            const createUserKey = event.target.attributes['name'].value;
            const newState = {...createUser};
            newState[createUserKey] = event.target.value;
            setConfirmPassword(newState);
        }
    }

    return (
        <div className="register">
            <form onSubmit={onSubmit}>
                <input type="text" 
                    required
                    name="username"
                    value={createUser.username}
                    onChange={handleInput}
                    placeholder="username" />
                <input type="password"
                    required
                    name="password"
                    value={createUser.password}
                    onChange={handleInput}
                    placeholder="password"></input>
                <input type="password"
                    required
                    name="confirmPassword"
                    value={confirmPassword.confirmPassword}
                    onChange={handleInput}
                    placeholder="confirm password"></input><br/>
                <button>Submit</button>
            </form>
            <button className="linkButton"><Link to="/">Home</Link></button>
        </div>
    )
}

export default Register;