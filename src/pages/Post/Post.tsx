import React, {useState} from "react";

import "./Post.css";
import PostForm from "../../components/PostForm";
import fetch from "../../utilities/fetch";
import { PostDetails } from "../../components/PostForm/PostForm";
import { useNavigate } from "react-router-dom";
import SongForm, { Song } from "../../components/SongForm/SongForm";

function Post() {

    const navigate = useNavigate();
    const [error, setError] = useState<string | undefined>(undefined);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [song, setSong] = useState<Song | undefined>();

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
        <>
            <main id="create-post">
                <h1>Create a Post</h1>
                { !song ? 
                <>
                    <h2>Find a Song to Review</h2>
                    <SongForm setSong={setSong}/>
                </>
                :
                <>
                    <h2>Review Details</h2>
                    <div>
                        <img src={song.image} alt="album cover"/>
                        <div>{song.name}</div>
                    </div>
                    <button onClick={() => setSong(undefined)}>Pick a Different Song</button>
                    <PostForm onSubmit={post} error={error} song={song}/>
                </>
                }
                {displaySuccess && <h4>Created Post. Navigating to post in 3 seconds</h4>}
            </main>
        </>
    )
}

export default Post;