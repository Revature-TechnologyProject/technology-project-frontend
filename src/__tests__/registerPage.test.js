import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";

import Register from "../pages/Register";
import fetch from "../utilities/fetch";

jest.mock("../utilities/fetch");
jest.mock("react-router-dom");
describe("Register Page", () => {
    let register;
    function setUser() {}
    beforeEach(() => {
        register = render(<Register setUser={setUser} />);
    });

    test("Renders title for page", async () => {
        const title = screen.getByText("Register");

        expect(title).toBeInTheDocument();
    });

    test("Renders form elements for username, password, and submit", () => {
        const submitButton = screen.getByRole("button");
        const usernameInput = screen.getByLabelText("Username*");
        const passwordInput = screen.getByLabelText("Password*");

        expect(submitButton).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    test("Renders success if request succeeds", async () => {
        const successText = "Successfully Registered Account, Returning to homepage in 3 seconds";

        fetch.mockResolvedValueOnce({ token: "something", user: { username: "asd", role: "admin" } });

        const submitButton = screen.getByRole("button");

        const successElementPre = screen.queryByText(successText);
        expect(successElementPre).toBeNull();

        fireEvent.click(submitButton);

        await waitFor(() => {
            const successElementPost = screen.queryByText(successText);
            expect(successElementPost).toBeInTheDocument();
        });
    });

    test("Renders error if request fails", async () => {
        const error = {
            error: "invalid username/password"
        }

        fetch.mockRejectedValueOnce(error);

        const submitButton = screen.getByRole("button");

        const errorElementPre = screen.queryByText(error.error);
        expect(errorElementPre).toBeNull();

        fireEvent.click(submitButton);

        await waitFor(() => {
            const errorElementPost = screen.queryByText(error.error);
            expect(errorElementPost).toBeInTheDocument();
        });
    });
});