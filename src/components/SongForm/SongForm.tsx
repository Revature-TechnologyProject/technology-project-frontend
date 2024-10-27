import React, {useState} from "react";

import "./SongForm.css";
import fetchJson from "../../utilities/fetch";
import PostCard from "../PostCard";
import { Link } from "react-router-dom";

interface Props {
    setSong: React.Dispatch<React.SetStateAction<Song|undefined>>
}

export interface Song {    
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

interface SongQuery {
    year?: string,
    genre?: string,
    artist?: string,
    track?: string,
    album?: string
}

const SongForm = ({setSong}: Props) => {

    const [foundSongs, setFoundSongs] = useState<Song[]>([]);
    const [songError, setSongError] = useState("");
    const [songQuery, setSongQuery] = useState<SongQuery>({});
    const [previousURL, setPreviousURL] = useState("");
    const [nextURL, setNextURL] = useState("");
    const [yearError, setYearError] = useState("");

    const findSong = async (e: any) => {
        e.preventDefault();
        try {
            const {showMore, songs, showPrevious} = await fetchJson("get", "/songs", songQuery);
            if (songs.length === 0) {
                setSongError("No Songs Found");
                return
            }
            setFoundSongs(songs);
            setNextURL(showMore);
            setPreviousURL(showPrevious);
            setSongError("");
        } catch (err: any) {
            setSongError(err.error);
        }
    }

    const paginate = async (url: string) => {
        try {
            const res = await fetch(url);
            const {showMore, songs, showPrevious} = await res.json();
            setFoundSongs(songs);
            setNextURL(showMore);
            setPreviousURL(showPrevious);
            window.scrollTo(0,0)
        } catch (err: any) {
            setSongError(err);
        }
    }

    const updateYearStart = (e: any) => {
        if (e.target.value.match(/[A-Za-z]+/) !== null) {
            setYearError("Year start must be numbers only, defaulting to an empty field");
            return;
        }
        if (songQuery?.year?.includes("-")) {
            const years = songQuery.year.split("-");
            setSongQuery((prev) => ({...prev, year: `${e.target.value}-${years[1]}`}));
        } else {
            setSongQuery((prev) => ({...prev, year: e.target.value}));
        }
        setYearError("");
    }

    const updateYearEnd = (e: any) => {
        if (e.target.value.match(/[A-Za-z]+/) !== null) {
            setYearError("Year end must be numbers only, defaulting to an empty field");
            return;
        }
        if (!songQuery.year) {
            setYearError("Year start needed for year end to be included");
            return;
        }
        if (songQuery.year.includes("-")) {
            const years = songQuery.year.split("-");
            setSongQuery((prev) => ({...prev, year: `${years[0]}-${e.target.value}`}));
        } else {
            setSongQuery((prev) => ({...prev, year: `${songQuery.year}-${e.target.value}`}));

        }
        setYearError("");
    }

    const clearSongSearch = () => {
        setSongQuery({});
        setFoundSongs([]);
        setYearError("");
    }

    return (
        <>
        {foundSongs.length === 0 ? <>
            <small>At least one field must be filled out</small>
            <form onSubmit={findSong}>
                <div className="form-group">
                    <label htmlFor="song">Song</label>
                    <input type="text" id="song" placeholder="Song" onChange={(e: any) => setSongQuery((prev) => ({...prev, track: e.target.value}))}/>
                </div>
                <div className="form-group">
                    <label htmlFor="artist">Artist</label>
                    <input type="text" id="artist" placeholder="Artist" onChange={(e: any) => setSongQuery((prev) => ({...prev, artist: e.target.value}))}/>
                </div>
                <div className="form-group">
                    <label htmlFor="album">Album</label>
                    <input type="text" id="album" placeholder="Album" onChange={(e: any) => setSongQuery((prev) => ({...prev, album: e.target.value}))}/>
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <input type="text" id="genre" placeholder="Genre" onChange={(e: any) => setSongQuery((prev) => ({...prev, genre: e.target.value}))}/>
                </div>
                <div className="flex justify-between">
                    <div className="form-group">
                        <label htmlFor="year-start">Year Start</label>
                        <input type="text" id="year-start" placeholder="1982" onChange={updateYearStart}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year-end">Year End (optional)</label>
                        <input type="text" id="year-end" placeholder="2001" onChange={updateYearEnd}/>
                    </div>
                </div>
                {yearError && <small className="error">{yearError}</small>}
                {songError && <small className="error">{songError}</small>}
                <button>Search for Songs</button>
            </form>
            </>
        :
            <div className="flex col justify-center align-center g5">
                <div className="song-container">
                    {foundSongs.map((song) => {
                        return (
                            <button key={song.spotifyId} className="song-button" onClick={() => {setSong(song)}}>
                                <img src={song.image} alt="album cover" className="song-button-image"/>
                                <div>{song.name} by {song.artists[0].name}{song.artists.slice(1).map((artist) => {return(<span key={artist.id}> and {artist.name}</span>)})}</div>
                            </button>
                        )
                    })}
                </div>
                <div className="flex justify-center g10 align-center">
                    {previousURL && <button onClick={() => paginate(previousURL)}>Previous</button>}
                    <button onClick={clearSongSearch}>Clear Search</button>
                    {nextURL && <button onClick={() => paginate(nextURL)}>Next</button>}
                </div>
            </div>
        }
        </>
    )
}

export default SongForm;