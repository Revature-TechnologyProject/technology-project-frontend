import React, {useState} from "react";

import "./ProfileForm.css";

interface props {
    onSubmit: (username:string, bio: string, genres: string[]) => any,
    error: string | undefined
};

function ProfileForm({onSubmit, error}: props) {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [genres, setGenres] = useState("");

    function submit(e: React.FormEvent) {
        e.preventDefault();
        let genresSet = new Set<string>();
        if (genres !== undefined && genres !== "") {
            genresSet = new Set(genres.replaceAll(" ", "").toLowerCase().split(","));
            genresSet.delete('');
        }
        onSubmit(username, bio, Array.from(genresSet));
    }

    return(
        <>
        <form onSubmit={submit}>
            <div className="form-group">
                <label htmlFor="usernameInput">Username:</label>
                <input type="text" className="input" id="usernameInput" placeholder="Enter here" onChange={(e: any) => {setUsername(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="bioInput">Bio:</label>
                <input type="text" className="input" id="bioInput" placeholder="Enter here" onChange={(e: any) => {setBio(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="genresInput">Genres:</label>
                <input type="text" className="input" id="genresInput" placeholder="Enter here" onChange={(e: any) => {setGenres(e.target.value)}}/>
            </div>
            {error && <small className="error">{error}</small>}
            <button>Submit</button>
        </form>
        </>
    )
}

export default ProfileForm;