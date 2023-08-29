export interface User {
    id: string;
    username: string;
    email: string;
}

export interface AuthResponse {
    payload: {
        accessToken: string;
        refreshToken: string;
    }
}

export interface AuthResponseError {
    error: string,
}
