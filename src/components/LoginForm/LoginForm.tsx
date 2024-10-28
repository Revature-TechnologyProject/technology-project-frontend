import React, {useState} from "react";

import "./LoginForm.css";

interface props {
    onSubmit: (username:string, password: string) => any,
    error: string | undefined
};

function LoginForm({onSubmit, error}: props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function submit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(username, password);
    } 

    return(
        <>
        <form onSubmit={submit}>
            <div className="form-group">
                <label htmlFor="usernameInput">Username*</label>
                <input type="text" className="input" id="usernameInput" placeholder="Username" required onChange={(e: any) => {setUsername(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput">Password*</label>
                <input type="password" className="input" id="passwordInput" placeholder="Password" required onChange={(e: any) => {setPassword(e.target.value)}}/>
            </div>
            {error && <small className="error">{error}</small>}
            <button>Submit</button>
        </form>
        </>
    )
}

export default LoginForm;