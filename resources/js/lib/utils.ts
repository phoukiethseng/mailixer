import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { newsletterContentType } from "../types/models";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getNewsletterContentTypeNameById(id: number): string | null {
    const entry = Object.entries(newsletterContentType).find(
        ([key, value]) => value === id
    );
    if (entry) return entry[0];
    else return null;
}
