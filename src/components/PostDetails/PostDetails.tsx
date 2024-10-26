import React, { useContext, useEffect, useState } from "react";

import "./PostDetails.css";
import fetch from "../../utilities/fetch";
import { Post } from "../PostCard/PostCard";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";


function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | undefined>();
    const user = useContext(UserContext);
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            try {
                const result = await fetch("get", `/posts/${id}`);
                const foundPost = result.post;
                console.log(foundPost);
                setPost(foundPost);
                setIsOwner(foundPost.postedBy == user?.itemID);
            } catch { }
        };
        getPost();
    }, [id]);

    async function deletePost(){
        await fetch("delete", `/posts/${id}`);
        setTimeout(() => {
            navigate("/");
        }, 3000);
        setIsDeleted(true);
    }

    return (
        <div className="no-deco post-card">
            {
                post ?
                    <>
                        <h3 className="post-title">{post.title}</h3>
                        <div className="post-song">
                            <img className="song-image" src={post.song?.image} alt="album cover" />
                            <h4 className="song-name">{post.song?.name}</h4>
                        </div>
                        <div className="post-metadata flex align-cent justify-between">
                            <span>Score: {post.score}/100</span>
                            <span>Likes: {post.likedBy.reduce((n, {like}:any) => n + like, 0)}</span>
                        </div>
                        <p>
                            {post.description}
                        </p>
                        <div className="post-metadata flex align-cent justify-between">
                            {post.tags &&
                                <span>Tags: {
                                    Object.keys(post.tags).map((tag: string) => <>{tag} </>)
                                }</span>}
                            {isOwner && <button onClick={deletePost}>Delete</button>}
                        </div>
                    </>
                    :
                    <p>Loading / Post Not Found</p>
            }
            {isDeleted && <div className="post-delete">
                Deleting Post...
            </div>}
        </div>
    );
}

interface Props {
    post: Post
}

export default PostDetails;