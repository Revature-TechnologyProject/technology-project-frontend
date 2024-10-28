import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Login from "../pages/Login";
import fetch from "../utilities/fetch";

jest.mock("../utilities/fetch");
jest.mock("react-router-dom");
describe("Login Page", () => {
    let login;
    function setUser() {}
    beforeEach(() => {
        login = render(<Login setUser={setUser} />);
    });

    test("Renders error if request fails", async () => {
        const error = {
            error: "invalid username/password"
        }

        fetch.mockRejectedValueOnce(error);

        const submitButton = screen.getByRole("button");

        let errorElement = screen.queryByText(error.error);
        expect(errorElement).toBeNull();

        fireEvent.click(submitButton);

        await waitFor(() => {
            const errorElementPost = screen.queryByText(error.error);
            expect(errorElementPost).toBeInTheDocument();
        });
    });

    test("Renders success if request succeeds", async () => {
        const successText = "Successfully Logged In, Returning to homepage in 3 seconds";

        fetch.mockResolvedValueOnce({token: "something", user: {username: "asd", role: "admin"}});

        const submitButton = screen.getByRole("button");

        const successElementPre = screen.queryByText(successText);
        expect(successElementPre).toBeNull();

        fireEvent.click(submitButton);

        await waitFor(() => {
            const successElementPost = screen.queryByText(successText);
            expect(successElementPost).toBeInTheDocument();
        });
    });

    test("Renders form elements for username, password, and submit", () => {
        const submitButton = screen.getByRole("button");
        const usernameInput = screen.getByLabelText("Username*");
        const passwordInput = screen.getByLabelText("Password*");

        expect(submitButton).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    test("renders title for page", () => {
        const title = screen.getByText("Log In");

        expect(title).toBeInTheDocument();
    });
})