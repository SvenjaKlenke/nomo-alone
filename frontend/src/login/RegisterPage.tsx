import React, {ChangeEvent, FormEvent, useState} from 'react';
import './LoginPage.css';
import logo from "../Logo.png";
import {useNavigate} from "react-router-dom";
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
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setUserModelRequest(newUser => ({...newUser, [name]: value}));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.post('/api/user/register', userModelRequest)
            .then(response => {
                navigate("/login");
                toast.success("Register successful! Please Login.");
            })
            .catch(error => {
                const errorData = error?.response?.data;
                if (errorData) {
                    const errorMessages: string[] = Object.values(errorData);
                    errorMessages.forEach((errorMessage: string) => {
                        toast.error(errorMessage);
                    });
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            });
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
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input password"
                                name="password"
                                value={userModelRequest.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="show-password-button"
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <button>Register</button>
                    </div>
                </form>
                <div className="BackButton">
                    <button className="RoundButton" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </div>
    );
}
export default RegisterPage;
