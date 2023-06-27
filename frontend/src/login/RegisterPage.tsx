import React, {ChangeEvent, FormEvent, useState} from 'react';
import './LoginPage.css';
import logo from "../Logo.png";
import {Link, useNavigate} from "react-router-dom";
import {UserModel} from './UserModel';
import axios from "axios";

function RegisterPage() {
    const [userModel, setUserModel] = useState<UserModel>({
        username: "",
        name: "",
        lastname: "",
        email: "",
        password: ""
    });
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setUserModel(newUser => ({...newUser, [name]: value}));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (validateFormFields()) {
            axios.post('/user', userModel)
                .then(() => navigate("/login"));
        }
    }

    function validateFormFields(): boolean {
        if (!userModel.username || !userModel.name || !userModel.lastname || !userModel.email || !userModel.password) {
            setIsAlertVisible(true);
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
                    {isAlertVisible && (
                        <div className="alert-message">
                            Please fill in all fields.
                        </div>
                    )}
                    <label className="color">Username :</label>
                    <input
                        type="text"
                        className="inputRegister"
                        name="username"
                        value={userModel.username}
                        onChange={handleChange}
                    />
                    <label className="color">Name :</label>
                    <input
                        type="text"
                        className="inputRegister"
                        name="name"
                        value={userModel.name}
                        onChange={handleChange}
                    />
                    <label className="color">Lastname :</label>
                    <input
                        type="text"
                        className="inputRegister"
                        name="lastname"
                        value={userModel.lastname}
                        onChange={handleChange}
                    />
                    <label className="color">E-Mail :</label>
                    <input
                        type="text"
                        className="inputRegister"
                        name="email"
                        value={userModel.email}
                        onChange={handleChange}
                    />
                    <label className="color">Password :</label>
                    <input
                        type="password"
                        className="inputRegister"
                        name="password"
                        value={userModel.password}
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