import React from "react";

import "./PostCard.css";
import { Link } from "react-router-dom";

const PostCard = ({post}: Props) => {
    const {title, description, isFlagged, itemID, likedBy, postedBy, replies, score, song} = post;
    return (
        <Link to={`/posts/${itemID}`} className="no-deco">
            <div className="post-card">
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
    replies: string[]
    score: number,
    title: string,
    song: Song
}

interface Song {    
    spotifyId: string,
    name: string,
    link: string,
    popularity: number,
    image: string,
    artists: Artists[]
}

interface Artists {
    id: string,
    name: string,
    url: string
}

export default PostCard;