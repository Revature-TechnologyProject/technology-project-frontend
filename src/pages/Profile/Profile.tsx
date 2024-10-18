import {useContext} from "react";
import { UserContext } from '../../context/userContext'
import NavLink from "../../components/NavLink";

import "./Profile.css";

function Profile() {
    const user = useContext(UserContext);
    return (
        <main>
            <h1>Profile</h1>
            <div>{user && <p>Username: {user.username}</p>}</div>
            <div>{user && <p>Bio: {user.bio}</p>}</div>
            <div>{user && <p>Genres: {user.genres.toString()}</p>}</div>
            <nav>
                {<NavLink to="/profile/update">Update Profile</NavLink>}
            </nav>
        </main>
    )
}

export default Profile;