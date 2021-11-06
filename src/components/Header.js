import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import handleToken from '../api/token';
import "../style/components.css"

const Header = ({isLoggedIn, setSavedToken}) => {
    let history = useHistory();

    function logOut (event) {
        event.preventDefault();
        handleToken.deleteToken();
        setSavedToken(null);
        history.push('/home');

    }
    function loggedIn (event) {
        event.preventDefault();
        event.onClick(() => {
            if(!isLoggedIn) {
                const error = 'You must be logged in to view this page'
                alert( new Error(error));
                history.push('/login')}
        })
    }

    return (
            <div className="header">
                <div className="siteTitle">Fitness Tracker</div>
            {isLoggedIn ? 
                <div className="loggedInHeader">
                    <h1>Welcome Back!</h1><br/>
                    <button className="linkButton"><Link to="/routines">Public Routines</Link></button>
                    <button className="linkButton"><Link to="/activities">Activities</Link></button>
                    <button className="Logout" onClick={logOut}>Log Out</button>
                </div>
            :
                <div className="loggedOutHeader">
                    <h1>Welcome!</h1>
                    <button className="linkButton"><Link to="/login">Login</Link></button>
                    <button className="linkButton"><Link to="/register">Register</Link></button>
                    <button className="linkButton"><Link to="/routines">Public Routines</Link></button>
                </div>
            }
            </div>
    )
}

export default Header;