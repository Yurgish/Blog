type UserObject = {
    [key: string]: any;
};

export const removeObjectFields = (user: UserObject, fields: string[]): UserObject => {
    const userObj = { ...user };
    fields.forEach((field) => {
        delete userObj[field];
    });
    return userObj;
};
