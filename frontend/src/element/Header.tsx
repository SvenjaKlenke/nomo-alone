import React from 'react';
import logo from "../Logo.png";
import './Header.css';
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";

function Header() {

    const navigate = useNavigate()

    function logoutUser() {
        return axios.post("/user/logout")
            .then(r => navigate("/login"))

    }

    return (
        <div>
            <header className="App-header">
                <NavLink to="/" className="LinkHeader">
                    <img src={logo} className="App-logo" alt="logo"/>
                </NavLink>
                <div className="ButtonContainerHeader">
                    <button className="RoundButtonHeader" onClick={logoutUser}>Logout</button>
                </div>
            </header>
        </div>
    );
}

export default Header;