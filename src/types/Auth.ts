export type User = {
    id: number;
    email: string;
    name: string;
}

export type AuthSession = {
    token: string;
    user: User;
}

export type AuthResponse = AuthSession;