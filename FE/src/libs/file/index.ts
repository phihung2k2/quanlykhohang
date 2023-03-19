export enum FILE_TYPE {
    PNG = "image/png",
    GIF = "image/gif",
    JPEG = "image/jpeg",
    JPG = "image/jpg",
    HEIC = "image/heic",
}
export const IMAGE_TYPES = [FILE_TYPE.PNG, FILE_TYPE.GIF, FILE_TYPE.JPEG, FILE_TYPE.JPG, FILE_TYPE.HEIC];
export const MAX_SIZE_IMAGE = 10_000_000;

/**
 * It converts a file to base64
 * @param {File} file - The file to be converted to base64
 * @param callback - (a: string | ArrayBuffer | null) => void
 */
export function convertFileToBase64(file: File | Blob | null, callback: (a: string | ArrayBuffer | null) => void) {
    const reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file);
    }
    reader.onloadend = function () {
        const base64data = reader.result;
        callback(base64data);
    };
}

export function convertFileToBase64v2(file: File) {
    const reader = new FileReader();
    let image: string | ArrayBuffer | null = "";
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        image = reader.result;

        return image;
    };

    return reader;
}

/**
 * It takes a blob, a name, and a type, and returns a file
 * @param {Blob | null} blob - The blob that you want to convert to a file.
 * @param {string} name - The name of the file.
 * @param {FILE_TYPE} type - FILE_TYPE = "image/jpeg" | "image/png" | "image/gif" | "image/bmp" |
 * "image/webp" | "image/tiff" | "image/svg+xml" | "image/x-icon"
 * @returns A file object
 */
export function convertBlobToFile(blob: Blob | null, name: string, type: FILE_TYPE) {
    const arrTypeFile = type.split("/");
    const filename = name + "." + arrTypeFile[arrTypeFile.length - 1];
    if (blob) {
        const file = new File([blob], filename, { type });
        return file;
    } else {
        return null;
    }
}

/**
 * It takes a base64 string, converts it to a blob, and then converts that blob to a file
 * @param {any} base64 - The base64 string that you want to convert to a blob.
 * @param callback - (a: File) => void
 * @param {string} name - The name of the file
 * @param {FILE_TYPE} fileType - The file type of the file you want to convert.
 * @returns filename
 */
export function convertBase64ToFile(base64: any, callback: (a: File) => void, name: string, fileType: FILE_TYPE) {
    const url = base64;
    const arrTypeFile = fileType.split("/");
    const filename = name + "." + arrTypeFile[arrTypeFile.length - 1];
    fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
            const file = new File([blob], filename, { type: fileType });
            callback(file);
        });
    return filename;
}

export function convertBase64ToFilePng(base64: any, callback: (a: File) => void, name: string) {
    return convertBase64ToFile(base64, callback, name, FILE_TYPE.PNG);
}

// upload

/**
 * Check if the file is an image and if it's not too big, then call the callback function.
 * @param {string} type - File
 * @param {string[]} types - FILE_TYPE[],
 */
function checkTypeFile(type: string, types: string[]) {
    return types.includes(type);
}

export function checkFileUpload(
    file: File,
    types: FILE_TYPE[],
    maxSize: number,
    callback: (a: File) => void,
    funcIsNotType?: any,
    funcIsNotSize?: any
) {
    const { size, type } = file;
    const isType = checkTypeFile(type, types);

    if (!isType && funcIsNotType) {
        return funcIsNotType;
    }

    if (maxSize < size && funcIsNotSize) {
        return funcIsNotSize;
    } else {
        callback(file);
        return;
    }
}
// upload image

export function checkImageUpload(file: File, callback: (a: File) => void, funcIsNotType?: any, funcIsNotSize?: any) {
    checkFileUpload(file, IMAGE_TYPES, MAX_SIZE_IMAGE, callback, funcIsNotType, funcIsNotSize);
}
