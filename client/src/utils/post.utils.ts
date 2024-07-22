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
