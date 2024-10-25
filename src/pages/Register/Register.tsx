import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Register.css";
import LoginForm from "../../components/LoginForm";
import fetch from "../../utilities/fetch";

interface props {
    setUser: Function,
}

function Register({ setUser }: props) {

    const navigate = useNavigate();
    const [error, setError] = useState();
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function register(username: string, password: string) {
        try {
            const { token, user } = await fetch("post", "/users/", {}, { username, password });
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
        <main>
            <h1>Register</h1>
            <LoginForm onSubmit={register} error={error} />
            {displaySuccess && <h4>Successfully Registered Account, Returning to homepage in 3 seconds</h4>}
        </main>
    )
}

export default Register;