import { DialogIcon } from "./dialog-icon";

export type DialogOptions = {
    title: string;
    message: string;
    action: () => void;
    actionName: string;
    icon?: DialogIcon;
}