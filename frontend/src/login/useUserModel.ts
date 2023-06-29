import {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function UseUserModel() {

    const [user, setUser] = useState<string>()
    const nav = useNavigate()

    function login(username: string, password: string) {
        return axios.post("/user/login", undefined, {auth: {username, password}})
            .then((response) => {
                getUsername()
            }).catch((error) => {
                toast.error('Please check Username/Password!')
            })
    }
    function logout() {
        return axios.post("/user/logout")
            .then(() => setUser(""))
            .then(r => nav("/login"))
    }

    function getUsername() {
        let username = undefined;
        axios.get("/user/me").then((response) => {
            setUser(response.data);
            username = response.data;
            if (username === "anonymousUser" || username === undefined) {
                nav("/login")
            } else nav("/")
        }).then(() => {
        })
            .catch(error => {
                console.log(error)
            })
    }

    return {login, logout, getUsername, user}
}

export default UseUserModel;