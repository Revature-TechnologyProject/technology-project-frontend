import React, {useEffect, useState} from "react";

import "./PostForm.css";
import fetch from "../../utilities/fetch";
import { Song } from "../SongForm/SongForm";

export interface PostDetails {
    title: string,
    score: number,
    text: string,
    song: Song,
    tags?: string[]
}

interface props {
    song: Song,
    onSubmit: ({}: PostDetails) => any,
    error: string | undefined
};

function PostForm({song, onSubmit, error}: props) {
    const [title, setTitle] = useState("");
    const [score, setScore] = useState(-1);
    const [description, setDesciption] = useState("");
    const [tags, setTags] = useState("");

    function submit(e: React.FormEvent) {
        e.preventDefault();
        // Convert tags to an array of strings if they 
        let tagSet = new Set<string>();
        if (tags !== undefined && tags !== "") {
            // Tags should be unique
            tagSet = new Set(tags.replaceAll(" ", "").toLowerCase().split(","));
            // Remove empty tag (Happens when you do ,,,,);
            tagSet.delete('');
        }
        onSubmit({title, score, text: description, tags: Array.from(tagSet), song});
    } 

    return(
        <>
        <form onSubmit={submit}>
            <div className="form-group">
                <label htmlFor="usernameInput">Title*</label>
                <input type="text" id="usernameInput" placeholder="Title" required onChange={(e: any) => {setTitle(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="scoreInput">Review Score*</label>
                <input type="text" inputMode="numeric" pattern="\d*" id="scoreInput" placeholder="Score out of 100" required onChange={(e: any) => setScore(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="descriptionInput">Description*</label>
                <textarea id="descriptionInput" placeholder="Description" rows={10} required onChange={(e: any) => {setDesciption(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="tagInput">Tags</label>
                <textarea id="tagInput" placeholder="comma,separated,tags" rows={2} onChange={(e: any) => {setTags(e.target.value)}}/>
            </div>
            {error && <small className="error">{error}</small>}
            <button>Submit</button>
        </form>
        </>
    )
}

export default PostForm;