import React, {useEffect, useState} from "react";

import "./Search.css";
import SearchForm from "../../components/SearchForm";
import fetch from "../../utilities/fetch";
import PostCard from "../../components/PostCard";

function Search() {
    
    const [error, setError] = useState();
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [result, setResult] = useState<any>([]);
    const [page, setPage] = useState(-1);
    const [postsFound, setPostFound] = useState([]);
    const [stillMore, setStillMore] = useState(true);

    useEffect(() => {
        loadMore()
    }, [postsFound]);

    async function search(tags: string, inclusive: any) {
        try {
            setPage(5);
            setStillMore(true);
            inclusive = inclusive ? "1" : "0";
            const {Posts} = await fetch("get", `/posts/tags/search?tags=${tags}&inclusive=${inclusive}`);
            setPostFound(Posts);
            setDisplaySuccess(true);
            setError(undefined);
        } catch (err: any) {
            setError(err.error);
        }
    }

    async function loadMore(){
        if (page >= postsFound.length){
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