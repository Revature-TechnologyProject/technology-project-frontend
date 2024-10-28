import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./PostUpdate.css";
import PostUpdateForm from "../../components/PostUpdateForm";
import fetch from "../../utilities/fetch";

function PostUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function update(description: string | undefined, title: string | undefined, score: number | undefined) {
        try {
            const { postId } = await fetch("PATCH", `/posts/${id}`, {}, {description, title, score});
            setError(undefined);
            setDisplaySuccess(true);
            setTimeout(() => {
                navigate(`/posts/${postId}`);
            }, 2000);
        } catch (err: any) {
            setError(err.error);
        }
    }

    return (
        <main id="log-in">
            <h1>Log In</h1>
            <PostUpdateForm onSubmit={update} error={error}/>
            {displaySuccess && <h4>Updating post...</h4>}
        </main>
    )
}

export default PostUpdate;