export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
}

export type NotificationType = "success" | "fail";
