import React, {useState} from "react";

import "./PostUpdateForm.css";

interface props {
    onSubmit: (description:string | undefined, title:string | undefined, score:number | undefined) => any,
    error: string | undefined
};

function PostUpdateForm({onSubmit, error}: props) {
    const [description, setDescription] = useState();
    const [title, setTitle] = useState();
    const [score, setScore] = useState<number>();

    function submit(e: React.FormEvent) {
        e.preventDefault();
        let s;
        if (score){
            s = Number(score);
        }
        onSubmit(description, title, s);
    }

    return(
        <>
        <form onSubmit={submit}>
            <div className="form-group">
                <label htmlFor="titleInput">Title</label>
                <input type="text" className="input" id="titleInput" placeholder="Title" onChange={(e: any) => {setTitle(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="descriptionInput">Description</label>
                <input type="text" className="input" id="descriptionInput" placeholder="Description" onChange={(e: any) => {setDescription(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="scoreInput">Score</label>
                <input type="text" className="input" id="scoreInput" placeholder="0-100" onChange={(e: any) => {setScore(e.target.value)}}/>
            </div>
            {error && <small className="error">{error}</small>}
            <button>Submit</button>
        </form>
        </>
    )
}

export default PostUpdateForm;