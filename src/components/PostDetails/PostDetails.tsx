import React, { useContext, useEffect, useState } from "react";

import "./PostDetails.css";
import fetch from "../../utilities/fetch";
import { Post } from "../PostCard/PostCard";
import ReplyCard from "../../components/ReplyCard";
import { User } from "../../context/userContext";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | undefined>();
    const [poster, setPoster] = useState<User | undefined>();
    const [replies, setReplies] = useState<any>([]);
    const user = useContext(UserContext);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            try {
                const result = await fetch("get", `/posts/${id}`);
                const foundPost = result.post;
                const pPost = await fetch("get", `/users/${foundPost.postedBy}`);
                setPoster(pPost.user);
                setPost(foundPost);
                setIsOwner(user?.itemID == foundPost.postedBy);
                setReplies(foundPost.replies.map((post: any) => <ReplyCard reply={post} key={post.itemID}/>));
            } catch { }
        };
        getPost();
    }, [id]);

    return (
        <div className="no-deco post-card">
            {
                post ?
                    <>
                        <div>{poster?.username}</div>
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
                            {isOwner && <Link to={`/posts/${id}/update`}>Edit</Link>}
                        </div>
                        <div className="post-metadata flex align-cent justify-between">
                            {user?.itemID && <Link to={`/posts/${id}/reply`}>Comment</Link>}
                        </div>
                        <div className="post-metadata flex align-cent justify-between">
                            {user?.itemID && <Link to={`/posts/${id}/reply`}>Comment</Link>}
                        </div>
                        <div>{replies}</div>
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