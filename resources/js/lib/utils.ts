import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {htmlToText as convert} from "html-to-text";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function htmlToText(html: string): string {
    return convert(html);
}

// Concat given style with pre-defined common css properties which all html share
export function withCommonCssProperties(style?: string) {
    return `margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; ${style ?? ""}`
}
