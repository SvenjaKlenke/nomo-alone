import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './LoginPage.css';
import logo from "../Logo.png";

type Props = {
    login: (username: string, password: string) => Promise<void>
}

function LoginPage(props: Props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    function loginOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.login(username, password)
            .then(() => {
                nav("/")
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function onChangeHandlerUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function onChangeHandlerPassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    return (
        <div>
            <div className="LoginLogo">
                <img src={logo} alt="Logo"/>
            </div>
            <form className="form" onSubmit={loginOnSubmit}>
                <div className="flex">
                    <div className="login color">Login</div>
                    <label className="color">Username :</label>
                    <input type="text" className="input" onChange={onChangeHandlerUsername}/>
                    <label className="color">Password :</label>
                    <input type="password" className="input" onChange={onChangeHandlerPassword}/>
                    <button className="">Log-in</button>
                    <br/>
                    <div className="color align">Don't have an account? <span className="span">Sign-Up</span></div>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;