import React, {useState} from "react";

import "./ReplyForm.css";

interface props {
    onSubmit: (text:string) => any,
    error: string | undefined
};

function ReplyForm({onSubmit, error}: props) {
    const [text, setText] = useState("");

    function submit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(text);
    } 

    return(
        <>
        <form onSubmit={submit}>
            <div className="form-group">
                <label htmlFor="textInpute">Description</label>
                <input type="text" className="input" id="textInput" placeholder="Text" required onChange={(e: any) => {setText(e.target.value)}}/>
            </div>
            {error && <small className="error">{error}</small>}
            <button>Submit</button>
        </form>
        </>
    )
}

export default ReplyForm;