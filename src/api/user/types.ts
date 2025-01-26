import { UserTypeWithoutPassword } from "../../types";

export type RequestUserUpdate = {
    name: string;
    email: string;
    password: string;
};

export type ResponseUser = {
    success: boolean;
    user: UserTypeWithoutPassword;
};
