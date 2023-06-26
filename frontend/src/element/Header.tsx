import React from 'react';
import logo from "../Logo.png";
import './Header.css';
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <div>
            <header className="App-header">
                <NavLink to="/" className="LinkHeader">
                    <img src={logo} className="App-logo" alt="logo"/>
                </NavLink>
            </header>
        </div>
    );
}

export default Header;