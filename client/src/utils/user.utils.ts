export const isAdmin = (roles: string[]): boolean => {
    return roles.includes("ADMIN");
};
