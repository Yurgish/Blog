export type IUserRegister = {
    login: string;
    email: string;
    password: string;
};

export type IUserLogin = {
    email: string;
    password: string;
};

export type IAuthResponce = {
    message: string;
    newUser: User;
};

export type User = {
    login: string;
    email: string;
    roles: string[];
    createdAt: string;
    _id: string;
};
