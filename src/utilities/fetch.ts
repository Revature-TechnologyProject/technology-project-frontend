const BASE_URL = "http://localhost:3001"

async function fetchJson(method: string, path: string, q?: {}, body?: {}) {
    const options: RequestInit= {
        headers: createHeaders(),
        mode: "cors",
        method,
    }
    if (body) {
        options.body = JSON.stringify(body); // Get requests aren't allowed to have bodies
    }
    const query = q ? new URLSearchParams(q).toString() : "";

    const response = await fetch(`${BASE_URL}${path}?${query}`, options);

    if (response.status === 404) {
        return Promise.reject({error: "Invalid server path"}); // Can't call .json on 404s (404s return HTML by default)
    }
    const json = await response.json();
    if (response.status < 200 || response.status >= 300) {
        return Promise.reject({statusCode: response.status, error: json.message}); // All our server errors should return {message: "something"} or {status: 400, message: "something"}
    }
    return json;
}

function createHeaders() {
    const headers: {"Content-Type": string, Authorization?: string} = {
        "Content-Type": "application/json"
    };
    const token = localStorage.getItem("token");
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    return headers;
}

export default fetchJson;