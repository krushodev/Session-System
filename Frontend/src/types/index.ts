export interface User {
    id: string;
    username: string;
    email: string;
}

export interface AuthResponse {
    payload: {
        user: User;
        accessToken: string;
    }
}
