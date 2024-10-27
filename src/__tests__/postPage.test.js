import React, {act} from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Post from "../pages/Post";
import fetch from "../utilities/fetch";

jest.mock("../utilities/fetch");
jest.mock("react-router-dom");

const song = {
    spotifyId: "id",
    name: "test",
    link: "listen here",
    popularity: 100,
    image: "image",
    artists: [
        {
            id: "id2",
            name: "artist",
            url: "spotify"
        }
    ]
};

const song2 = {
    spotifyId: "id2",
    name: "test",
    link: "listen here",
    popularity: 100,
    image: "image",
    artists: [
        {
            id: "id2",
            name: "artist",
            url: "spotify"
        }
    ]
};

const song3 = {
    spotifyId: "id3",
    name: "test",
    link: "listen here",
    popularity: 100,
    image: "image",
    artists: [
        {
            id: "id2",
            name: "artist",
            url: "spotify"
        }
    ]
};

describe("Song Selection of Post Form Page", () => {
    beforeEach(() => {
        render(<Post/>);
    });

    test("renders title for page", () => {
        const title = screen.getByText("Create a Post");

        expect(title).toBeInTheDocument();
    });

    test("Renders the song form first", () => {
        const heading = screen.getByText("Find a Song to Review"); 
        const searchButton = screen.getByRole("button");
        const song = screen.getByLabelText("Song");
        const artist = screen.getByLabelText("Artist");
        const album = screen.getByLabelText("Album")
        const genre = screen.getByLabelText("Genre");
        const yearStart = screen.getByLabelText("Year Start");
        const yearEnd = screen.getByLabelText("Year End (optional)");



        expect(searchButton).toBeInTheDocument();
        expect(song).toBeInTheDocument();
        expect(artist).toBeInTheDocument();
        expect(album).toBeInTheDocument();
        expect(genre).toBeInTheDocument();
        expect(yearStart).toBeInTheDocument();
        expect(yearEnd).toBeInTheDocument();
        expect(heading).toBeInTheDocument();
    });

    test("Renders song selection UI after the song form is entered in", async () => {
        const fetchResult = {
            showMore: "",
            showPrevious: "",
            songs: [song, song2, song3]
        }

        const searchButton = screen.getByRole("button");
        const songInput = screen.getByLabelText("Song");
        fetch.mockResolvedValueOnce(fetchResult);

        userEvent.type(songInput, "test");
        await act(async () => {
            fireEvent.click(searchButton);
        });
        const clearButton = screen.getByText("Clear Song Search");
        const allButtons = await screen.findAllByRole("button");
        expect(clearButton).toBeInTheDocument();
        expect(allButtons.length - 1).toBe(fetchResult.songs.length); // Song selection buttons from the songs minus the clear button
    });

    test("Renders post details form after a song is selected", async () => {
        const fetchResult = {
            showMore: "",
            showPrevious: "",
            songs: [song, song2, song3]
        }

        const searchButton = screen.getByRole("button");
        const songInput = screen.getByLabelText("Song");
        fetch.mockResolvedValueOnce(fetchResult);

        userEvent.type(songInput, "test");
        await act(async () => {
            fireEvent.click(searchButton);
        });

        const allButtons = await screen.findAllByRole("button");

        await act(async () => {
            userEvent.click(allButtons[0]);
        })

        const submitButton = screen.getByText("Submit");
        const titleInput = screen.getByLabelText("Title*");
        const scoreInput = screen.getByLabelText("Review Score*");
        const descriptionInput = screen.getByLabelText("Description*")
        const tagsInput = screen.getByLabelText("Tags");

        expect(submitButton).toBeInTheDocument();
        expect(titleInput).toBeInTheDocument();
        expect(scoreInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(tagsInput).toBeInTheDocument(); 
    });
});

describe("Post Details Form Tests", () => {
    beforeEach(async () => {
        render(<Post/>);
        const fetchResult = {
            showMore: "",
            showPrevious: "",
            songs: [song, song2, song3]
        }

        const searchButton = screen.getByRole("button");
        const songInput = screen.getByLabelText("Song");
        fetch.mockResolvedValueOnce(fetchResult);

        userEvent.type(songInput, "test");
        await act(async () => {
            fireEvent.click(searchButton);
        });

        const allButtons = await screen.findAllByRole("button");

        await act(async () => {
            userEvent.click(allButtons[0]);
        })
    });


    test("Renders error if request fails", async () => {
        const error = {
            error: "invalid score"
        }

        fetch.mockRejectedValueOnce(error);

        const submitButton = screen.getByText("Submit");

        let errorElement = screen.queryByText(error.error);
        expect(errorElement).toBeFalsy();

        await act(async () => fireEvent.click(submitButton));

        await waitFor(() => {
            errorElement = screen.queryByText(error.error);
            expect(errorElement).toBeInTheDocument();
        }); 
    }); 

    test("Renders success if request succeeds", async () => {
        const successText = "Created Post. Navigating to post in 3 seconds";

        fetch.mockResolvedValueOnce({message: "something", post: {itemID: "something"}});

        const submitButton = screen.getByText("Submit");

        let successElement = screen.queryByText(successText);
        expect(successElement).toBeFalsy();

        await act(async () => fireEvent.click(submitButton));

        successElement = screen.queryByText(successText);
        expect(successElement).toBeInTheDocument();
    });

    test("Form elements for title, score, description are required", () => {
        const titleInput = screen.getByLabelText("Title*");
        const scoreInput = screen.getByLabelText("Review Score*");
        const descriptionInput = screen.getByLabelText("Description*")

        expect(titleInput).toHaveAttribute("required");
        expect(scoreInput).toHaveAttribute("required");
        expect(descriptionInput).toHaveAttribute("required");
    });

    test("Score input must be numeric", () => {
        const scoreInput = screen.getByLabelText("Review Score*");

        expect(scoreInput).toHaveAttribute("inputmode", "numeric");
    })
});