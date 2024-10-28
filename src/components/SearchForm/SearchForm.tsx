import React, {useState} from "react";

import "./SearchForm.css";

interface props {
    onSubmit: (tags: string, inclusive: string) => any,
    error: string | undefined
};

function SearchForm({onSubmit, error}: props) {
    const [tags, setTags] = useState("");
    const [inclusive, setInclusive] = useState("");

    function submit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(tags, inclusive);
    } 

    return(
        <>
        <form onSubmit={submit}>
            <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input type="text" className="input" id="tagInput" placeholder="tags,to,search" onChange={(e: any) => {setTags(e.target.value)}}/>
            </div>
            <div className="check-group">
                <label htmlFor="passwordInput">Inclusive</label>
                <input type="checkbox" className="inputcheck" id="inclusiveInput" onChange={(e: any) => {setInclusive(e.target.checked)}}/>
            </div>
            {error && <small className="error">{error}</small>}
            <button>Search</button>
        </form>
        </>
    )
}

export default SearchForm;