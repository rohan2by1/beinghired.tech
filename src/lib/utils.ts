//src\lib\utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- ADD THIS FUNCTION ---
export function getCompanyLogo(website: string | undefined | null) {
  if (!website) return null;

  try {
    // 1. Clean the URL to get just the domain (e.g., "https://stripe.com" -> "stripe.com")
    // This handles "https://", "www.", and trailing slashes
    const domain = website
      .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
      .split('/')[0];

    // 2. Return the new API URL
    return `https://img.logo.dev/${domain}?token=pk_V60cLc0-Q6-_4YwbhD6d3g`;
  } catch (e) {
    return null;
  }
}