import React, {ChangeEvent, FormEvent, useState} from 'react';
import './LoginPage.css';
import logo from "../Logo.png";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {UserModelRequest} from "./UserModelRequest";
import {toast} from "react-toastify";

function RegisterPage() {
    const [userModelRequest, setUserModelRequest] = useState<UserModelRequest>({
        username: "",
        name: "",
        lastname: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setUserModelRequest(newUser => ({...newUser, [name]: value}));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (validateFormFields()) {
            axios.post('/user/register', userModelRequest)
                .then(() => navigate("/login"));
            toast.success("Register successful! Please Login.");
        }
    }

    function validateFormFields(): boolean {
        if (!userModelRequest.username || !userModelRequest.name || !userModelRequest.lastname || !userModelRequest.email || !userModelRequest.password) {
            toast.error('Please fill in all fields.')
            return false;
        }
        return true;
    }

    return (
        <div>
            <div className="LoginLogo">
                <img src={logo} alt="Logo"/>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="flex">
                    <div className="login color">Register</div>
                    <label className="color">Username :</label>
                    <input
                        type="text"
                        className="inputRegister"
                        name="username"
                        value={userModelRequest.username}
                        onChange={handleChange}
                    />
                    <label className="color">Name :</label>
                    <input
                        type="text"
                        className="inputRegister"
                        name="name"
                        value={userModelRequest.name}
                        onChange={handleChange}
                    />
                    <label className="color">Lastname :</label>
                    <input
                        type="text"
                        className="inputRegister"
                        name="lastname"
                        value={userModelRequest.lastname}
                        onChange={handleChange}
                    />
                    <label className="color">E-Mail :</label>
                    <input
                        type="text"
                        className="inputRegister"
                        name="email"
                        value={userModelRequest.email}
                        onChange={handleChange}
                    />
                    <label className="color">Password :</label>
                    <input
                        type="password"
                        className="inputRegister"
                        name="password"
                        value={userModelRequest.password}
                        onChange={handleChange}
                    />
                    <button className="">Register</button>
                </div>
                <div>
                    <Link className="Links" to={`/login`}>back</Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
