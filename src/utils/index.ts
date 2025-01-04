import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const isEmpty = (data?: [] | string | object): boolean => {
  if (data === undefined || data === null) return true;

  if (Array.isArray(data) || typeof data === "string") {
    return data.length === 0;
  }

  if (typeof data === "object" && data !== null) {
    return Object.keys(data).length === 0;
  }

  return true;
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
