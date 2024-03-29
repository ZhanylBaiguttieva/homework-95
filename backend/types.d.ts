import mongoose, {Model} from "mongoose";

export interface UserFields {
    email: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleId?: string;
    avatar: string | null;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;

export interface CocktailFields {
    name: string;
    image: string;
    recipe: string;
    isPublished: boolean;
    ingredients: [{
        name: string;
        quantity: string;
    }]
}