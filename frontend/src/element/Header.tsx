import React from 'react';
import logo from "../Logo.png";
import './Header.css';
import {Link} from "react-router-dom";

function Header() {
    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <Link className="LinkHeader" to={"/"}>Home</Link>
            </header>
        </div>
    );
}

export default Header;