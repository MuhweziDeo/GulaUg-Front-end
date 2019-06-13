export interface IUser {
    username: string;
    email: string;
    id: number;
    isAdmin?: boolean;
    active?: boolean;
    createdAt?: string;
    email_verified?: string;
    updatedAt?: string;
    verified_on?: string;
}

export interface IProfile {
    User: IUser;
    image: string;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    createdAt: string;
    updatedAt: string;
    id: number;
    username: string;
}
