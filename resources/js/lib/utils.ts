import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {htmlToText as convert} from "html-to-text";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function htmlToText(html: string ): string {
    return convert(html);
}
