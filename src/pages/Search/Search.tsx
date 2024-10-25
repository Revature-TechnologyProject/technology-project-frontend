import React, {useState} from "react";

import "./Search.css";
import SearchForm from "../../components/SearchForm";
import fetch from "../../utilities/fetch";
import PostCard from "../../components/PostCard";

function Search() {
    
    const [error, setError] = useState();
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [result, setResult] = useState<any>([]);
    const [page, setPage] = useState(5);
    const [postsFound, setPostsFound] = useState<any>([]);
    const [stillMore, setStillMore] = useState(true);

    async function search(tags: string, inclusive: string) {
        try {
            setPage(5);
            if (inclusive !== "1"){
                inclusive = "0";
            }
            const {Posts} = await fetch("get", `/posts/tags/search?tags=${tags}&inclusive=${inclusive}`);
            setPostsFound(Posts);
            setDisplaySuccess(true);
            setError(undefined);
            loadMore();
        } catch (err: any) {
            setError(err.error);
        }
    }

    async function loadMore(){
        if (page > postsFound.length){
            setPage(postsFound.length);
            setStillMore(false);
        }
        const result = postsFound.slice(0, page);
        setPage(page+5);
        setResult(result.map((post: any) => <PostCard post={post} key={post.itemID}/>));
    }


    return (
        <main id="search">
            <h1>Search Posts</h1>
            <SearchForm onSubmit={search} error={error}/>
            {displaySuccess && <h4>Results</h4>}
            {displaySuccess && result}
            {displaySuccess && stillMore && <button onClick={loadMore}>Load More</button>}
        </main>
    )
}

export default Search;