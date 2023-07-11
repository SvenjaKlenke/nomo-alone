import React, {ChangeEvent, FormEvent, useState} from 'react';
import './LoginPage.css';
import logo from "../Logo.png";
import {Link} from "react-router-dom";
import {ImEye, ImEyeBlocked} from "react-icons/im";

type Props = {
    login: (username: string, password: string) => void;
};

function LoginPage(props: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function loginOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.login(username, password);
    }

    function onChangeHandlerUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function onChangeHandlerPassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <div>
            <div className="LoginLogo">
                <img src={logo} alt="Logo"/>
            </div>
            <div className="form-container">
                <form className="form" onSubmit={loginOnSubmit}>
                    <div className="flex">
                        <div className="login color">Login</div>
                        <label className="color">Username :</label>
                        <input
                            type="text"
                            className="input"
                            onChange={onChangeHandlerUsername}
                        />
                        <label className="color">Password :</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input password"
                                onChange={onChangeHandlerPassword}
                            />
                            <button
                                type="button"
                                className="show-password-button"
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? <ImEyeBlocked className="icon-large"/> :
                                    <ImEye className="icon-large"/>}
                            </button>
                        </div>
                        <button className="">Login</button>
                        <br/>
                        <div className="color align">
                            Don't have an account?{" "}
                            <Link className="LinkRegister" to={`/register`}>
                                Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
