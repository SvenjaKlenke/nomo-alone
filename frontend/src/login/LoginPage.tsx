import React, {ChangeEvent, FormEvent, useState} from 'react';
import './LoginPage.css';
import logo from "../Logo.png";
import {Link} from "react-router-dom";

type Props = {
    login: (username: string, password: string) => void
}

function LoginPage(props: Props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function loginOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.login(username, password)
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
                    <button className="">Login</button>
                    <br/>
                    <div className="color align">Don't have an account? <Link className="LinkRegister" to={`/register`}>Sign
                        in</Link></div>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;