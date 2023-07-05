import React from 'react';
import logo from "../Logo.png";
import './Header.css';
import {NavLink, useNavigate} from "react-router-dom";

type Props = {
    logout: () => void
}

function Header(props: Props) {

    const navigate = useNavigate();

    function clickForMyTasks() {
        navigate("/mytasks");
    }

    return (
        <div>
            <header className="App-header">
                <div className="LogoContainer">
                    <NavLink to="/" className="LinkHeader">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </NavLink>
                </div>
                <div className="ButtonContainerHeader">
                    <button className="RoundButtonHeader" onClick={props.logout}>Logout</button>
                    <button className="RoundButtonHeader" onClick={clickForMyTasks}>My Tasks</button>
                </div>
            </header>
        </div>
    );
}

export default Header;