import {useEffect, useState} from "react";

import "./PostCard.css";
import { Link } from "react-router-dom";
import { User } from "../../context/userContext";
import { Song } from "../SongForm/SongForm";
import fetch from "../../utilities/fetch";

const PostCard = ({post}: Props) => {
    const {title, description, isFlagged, itemID, likedBy, postedBy, replies, score, song} = post;
    const [poster, setPoster] = useState<User | undefined>();

    useEffect(() =>{
        const getUsername = async () => {
            const { user } = await fetch("get", `/users/${postedBy}`);
            setPoster(user);
        }
        getUsername();
    }, [title]);

    return (
        <Link to={`/posts/${itemID}`} className="no-deco">
            <div className="post-card">
                <div>{poster?.username}</div>
                <h3 className="post-title">{title}</h3>
                <div className="post-song">
                    <img className="song-image" src={song?.image} alt="album cover"/>
                    <h4 className="song-name">{song?.name}</h4>
                </div>
                <div className="post-metadata flex align-cent justify-between">
                    <span>Score: {score}/100</span>
                    <span> Likes: {likedBy.reduce((n, {like}:any) => n + like, 0)}</span>
                </div>
            </div>
        </Link>
    )
}

interface Props {
    post: Post
}

export interface Post {
    description: string,
    isFlagged: number,
    itemID: string,
    likedBy: string[],
    postedBy: string,
    replies: any[],
    score: number,
    title: string,
    song: Song,
    tags: object
}
export default PostCard;