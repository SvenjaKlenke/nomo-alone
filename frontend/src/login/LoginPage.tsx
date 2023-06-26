import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";

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
            <form onSubmit={loginOnSubmit}>
                <input type="Username" onChange={onChangeHandlerUsername}/>
                <input type="Password" onChange={onChangeHandlerPassword}/>
                <button>LOGIN</button>
            </form>
        </div>
    );
}

export default LoginPage;