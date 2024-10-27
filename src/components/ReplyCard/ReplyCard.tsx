import "./ReplyCard.css";
import { User } from "../../context/userContext";
import React, { useContext, useEffect, useState } from "react";
import fetch from "../../utilities/fetch";
import { UserContext } from "../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";

const ReplyCard = ({reply}: Props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const currentUser = useContext(UserContext);
    const {postedBy, itemID, description} = reply;
    const [poster, setPoster] = useState<User | undefined>();
    const [isOwner, setIsOwner] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() =>{
        const getUsername = async () => {
            const { user } = await fetch("get", `/users/${postedBy}`);
            setPoster(user);
            setIsOwner(postedBy == currentUser?.itemID);
        }
        getUsername();
    }, [isDeleted]);

    async function deleteReply(){
        await fetch("delete", `/posts/${id}/replies/${itemID}`);
        setIsDeleted(true);
    }

    return (
        <div className="no-deco">{ !isDeleted &&
            <div className="post-card">
                <div className="post-title">{poster?.username}</div>
                <div>{description}</div>
                {isOwner && <button onClick={deleteReply}>Delete</button>}
            </div>
        }</div>
    )
}

interface Props {
    reply: Reply
}

export interface Reply {
    description: string,
    itemID: string,
    postedBy: string
}

export default ReplyCard;