import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import LoginForm from "../../components/LoginForm";
import fetch from "../../utilities/fetch";

interface props {
    setUser: Function,
}

function Login({setUser}: props) {

    const navigate = useNavigate();
    const [error, setError] = useState();
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function login(username: string, password: string) {
        try {
            const {token, user} = await fetch("post", "/users/login", {}, {username, password});
            localStorage.setItem("token", token);
            setUser(user);
            setDisplaySuccess(true);
            setTimeout(() => {
                navigate("/"); // Don't use window.location otherwise the page refreshes
            }, 3000);
        } catch (err: any) {
            setError(err.error); 
        }
    }

    return (
        <main id="log-in">
            <h1>Log In</h1>
            <LoginForm onSubmit={login} error={error}/>
            {displaySuccess && <h4>Successfully Logged In, Returning to homepage in 3 seconds</h4>}
        </main>
    )
}

export default Login;