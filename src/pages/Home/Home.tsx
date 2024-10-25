import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import fetch from "../../utilities/fetch";
import "./Home.css";
import PostCard from "../../components/PostCard";
import { Post } from "../../components/PostCard/PostCard";

function Profile() {
    const {id} = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const {posts} = await fetch("get", "/posts");
                let page = 5;
                if (posts.length < 5){
                    setPosts(posts.reverse());
                }
                else{
                    setPosts(posts.slice(posts.length-5, posts.length).reverse());
                }
            } catch {
               // Do nothing if error
            }
        }
        getPosts();
    }, [id]);
    return (
        <main id="homepage">
            <h1>WELCOME</h1>
                <section id="posts" className="postssection">
                    <h2>Recent Posts</h2>
                    {posts.length !== 0 ? 
                        posts.map((post: Post) => {
                            return <PostCard post={post} key={post.itemID}/>
                        })
                    :
                        <p>No Posts Made</p>
                }
                </section>
        </main>
    )
}

export default Profile;