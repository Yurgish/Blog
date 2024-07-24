export const htmlToPlainText = (html: string): string => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    let text = tempElement.textContent || tempElement.innerText || "";

    text = text.replace(/([a-z])([A-Z])/g, "$1. $2");

    if (text.length > 0 && text[text.length - 1] !== ".") {
        text += ".";
    }

    return text.trim();
};

export const transformEmail = (email: string): string => {
    if (!email) return "";
    return "@" + email.split("@")[0];
};

export const cleanTags = (tags: string[]): string[] => {
    return tags.map((tag) => tag.replace(/[^a-zA-Z0-9]/g, "").toLowerCase());
};

export const addHashtags = (tags: string[]): string[] => {
    return tags.map((tag) => `#${tag}`);
};

export const splitTags = (tags: string): string[] => {
    return tags.split(",").map((tag) => tag.trim());
};

export const isAuthorOfPost = (userEmail: string, postAuthorEmail: string): boolean => {
    return userEmail === postAuthorEmail;
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};
