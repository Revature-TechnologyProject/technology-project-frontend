import {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext'

import "./ProfileUpdate.css";
import ProfileForm from "../../components/ProfileForm";
import fetch from "../../utilities/fetch";

interface props {
    setUser: Function,
}

function ProfileUpdate({setUser}: props){
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function update(username: string, bio: string, genres: string[]) {
        const userID = user ? user.itemID : "0";
        try {
            const {updatedUser, updatedToken} = await fetch("put", `/users/${userID}`, {}, {username, bio, genres});
            localStorage.setItem("token", updatedToken);
            setDisplaySuccess(true);
            setUser(updatedUser.Item);
            setError(undefined);
            setTimeout(() => {
                navigate(`/profile/${updatedUser.Item.itemID}`);
            }, 3000)
        } catch (err: any) {
            setError(err.error);
        }
    }

    return (
        <main>
            <h1>Change Profile</h1>
            <ProfileForm onSubmit={update} error={error}/>
            {displaySuccess && <h4>Successfully updated, Returning to profile in 3 seconds</h4>}
        </main>
    )
}

export default ProfileUpdate;