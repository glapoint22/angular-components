import { ColorType } from "./color";
import { DialogIcon } from "./dialog-icon";

export type DialogOptions = {
    title: string;
    message: string;
    action: () => void;
    actionName?: string;
    cancelName?: string;
    icon?: DialogIcon;
    color?: ColorType;
    defaultFocus?: 'action' | 'cancel';
}