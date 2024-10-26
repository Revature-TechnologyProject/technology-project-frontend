import React, { useContext, useEffect, useState } from "react";

import "./PostDetails.css";
import fetch from "../../utilities/fetch";
import { Post } from "../PostCard/PostCard";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function PostDetails() {
    const user = useContext(UserContext);
    const { id } = useParams();
    const [post, setPost] = useState<Post | undefined>();
    const [likes, setLikes] = useState(post?.likedBy.reduce((n, {like}:any) => n + like, 0));
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const [alreadyDisliked, setAlreadyDisliked] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            try {
                const result = await fetch("get", `/posts/${id}`);
                const foundPost = result.post;
                setPost(foundPost);
                setLikes(foundPost?.likedBy.reduce((n:any, {like}:any) => n + like, 0));
                for (const u of foundPost.likedBy){
                    if (u.userID == user?.itemID){
                        if (u.like == -1){
                            setAlreadyDisliked(true);
                            break;
                        }
                        else{
                            setAlreadyLiked(true);
                            break;
                        }
                    }
                }
            } catch { }
        };
        getPost();
    }, [id]);

    useEffect(() => {}, [likes]);

    async function like(){
        try{
            await fetch("put", `/posts/${id}/likes`, {}, {like: 1});
            if (likes){
                if (alreadyDisliked){
                    setLikes(likes+2);
                }
                else{
                    setLikes(likes+1);
                }
                setAlreadyLiked(true);
                setAlreadyDisliked(false);
            }
        }
        catch{}
    }

    async function dislike(){
        try{
            await fetch("put", `/posts/${id}/likes`, {}, {like: -1});
            if (likes){
                if (alreadyLiked){
                    setLikes(likes-2);
                }
                else{
                    setLikes(likes-1);
                }
                setAlreadyLiked(false);
                setAlreadyDisliked(true);
            }
        }
        catch{}
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
                            <span>
                                <button onClick={like}>Like</button>
                                | {likes} |
                                <button onClick={dislike}>Dislike</button>
                            </span>
                        </div>
                        <p>
                            {post.description}
                        </p>
                        <div className="post-metadata flex align-cent justify-between">
                            {post.tags &&
                                <span>Tags: {
                                    Object.keys(post.tags).map((tag: string) => <>{tag} </>)
                                }</span>}
                        </div>
                    </>
                    :
                    <p>Loading / Post Not Found</p>
            }
        </div>
    );
}

interface Props {
    post: Post
}

export default PostDetails;