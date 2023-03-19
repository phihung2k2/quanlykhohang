export function setLocalStored(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
}

export function clearLocalStored(key: string): void {
    localStorage.removeItem(key);
}
// Set localStorage common
/**
 * If the window object exists, get the item from localStorage, otherwise return an empty string.
 * @param {string} key - The key to store the data under.
 * @returns The value of the key in localStorage.
 */
export function getLocalStored(key: string): any {
    const stored = typeof window !== "undefined" ? localStorage.getItem(key) : "";
    return stored ? JSON.parse(stored) : null;
}
