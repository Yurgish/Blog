export type IUserRegister = {
    login: string;
    email: string;
    password: string;
};

export type IUserLogin = {
    email: string;
    password: string;
};

export type IAuthResponse = {
    message: string;
    user: IUser;
};

export type IUser = {
    login: string;
    email: string;
    roles: string[];
    createdAt: string;
    _id: string;
};
