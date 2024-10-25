import React, {useState} from "react";

import "./Post.css";
import PostForm from "../../components/PostForm";
import fetch from "../../utilities/fetch";
import { PostDetails } from "../../components/PostForm/PostForm";
import { useNavigate } from "react-router-dom";

function Post() {

    const navigate = useNavigate();
    const [error, setError] = useState(undefined);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function post(postDetails: PostDetails) {
        try {
            const {post} = await fetch("post", "/posts", {}, postDetails);
            setError(undefined);
            setDisplaySuccess(true);
            setTimeout(() => {
                navigate(`/posts/${post.itemID}`)
            }, 3000);
        } catch (err: any) {
            setError(err.error);
        }
    }

    return (
        <main id="create-post">
            <h1>Create a Post</h1>
            <PostForm onSubmit={post} error={error}/>
            {displaySuccess && <h4>Created Post. Navigating to post in 3 seconds</h4>}
        </main>
    )
}

export default Post;