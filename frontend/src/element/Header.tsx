import React from 'react';
import logo from "../Logo.png";

function Header() {
    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
        </div>
    );
}

export default Header;