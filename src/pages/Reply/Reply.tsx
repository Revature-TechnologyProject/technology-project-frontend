import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./Reply.css";
import ReplyForm from "../../components/ReplyForm";
import fetch from "../../utilities/fetch";

function Reply() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function reply(text: string) {
        try {
            await fetch("patch", `/posts/${id}/replies`, {}, {text});
            setError(undefined);
            setDisplaySuccess(true);
            setTimeout(() => {
                navigate(`/posts/${id}`);
            }, 2000);
        } catch (err: any) {
            setError(err.error);
        }
    }

    return (
        <main id="log-in">
            <h1>Comment</h1>
            <ReplyForm onSubmit={reply} error={error}/>
            {displaySuccess && <h4>Creating comment...</h4>}
        </main>
    )
}

export default Reply;