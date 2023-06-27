import React from 'react';
import './LoginPage.css';
import logo from "../Logo.png";
import {Link} from "react-router-dom";


function RegisterPage() {
    function clickForRegister() {

    }

    return (
        <div>
            <div className="LoginLogo">
                <img src={logo} alt="Logo"/>
            </div>
            <form className="form">
                <div className="flex">
                    <div className="login color">Register</div>
                    <label className="color">Username :</label>
                    <input type="text" className="inputRegister"/>
                    <label className="color">Name :</label>
                    <input type="text" className="inputRegister"/>
                    <label className="color">Lastname :</label>
                    <input type="text" className="inputRegister"/>
                    <label className="color">E-Mail :</label>
                    <input type="text" className="inputRegister"/>
                    <label className="color">Password :</label>
                    <input type="password" className="inputRegister"/>
                    <button className="" onClick={clickForRegister}>Register</button>
                </div>
                <div>
                    <Link className="Links" to={`/login}`}>back</Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;