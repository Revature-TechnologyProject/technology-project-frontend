import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import fetch from "../../utilities/fetch";
import { User } from "../../context/userContext";
import "./Profile.css";
import PostCard from "../../components/PostCard";
import { Post } from "../../components/PostCard/PostCard";

function Profile() {
    const {id} = useParams();
    const [user, setUser] = useState<User | undefined>();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const {user} = await fetch("get", `/users/${id}`);
                console.log(user);
                setUser(user);
            } catch {
                // Do nothing if error
            }
        }

        const getPosts = async () => {
            try {
                const {posts} = await fetch("get", "/posts", {postedBy: id});
                setPosts(posts);
            } catch {
               // Do nothing if error
            }
        }
        getUser();
        getPosts();
    }, [id]);
    return (
        <main id="profile">
            <h1>Profile</h1>
            {user ? 
            <>
                <section id="profile-info" className="flex g10 col">
                    <div className="flex col justify-center align-center g10">
                        <img className="profile-image" src={user.profileImage} alt="Profile"/>
                        <h2>{user.username}</h2>
                    </div>
                    <div className="flex justify-evenly">
                        <div>
                            <h3>Biography</h3>
                            <p>{user.bio ? user.bio : "No biography"}</p>
                        </div>
                        <div>
                            <h3>Favorite Genres</h3>
                            <p>{user.genres.length !== 0 ? user.genres.toString().replaceAll(",", ", ") : "No genres listed"}</p>
                        </div>
                    </div>
                </section>
                <section id="profile-posts" className="flex g10 col">
                    <h2>Posts</h2>
                    {posts.length !== 0 ? 
                        posts.map((post: Post) => {
                            return <PostCard post={post} key={post.itemID}/>
                        })
                    :
                        <p>No Posts Made</p>
                }
                </section>
            </>
            :
            <p>Loading / Profile Not Found</p>
            }
        </main>
    )
}

export default Profile;