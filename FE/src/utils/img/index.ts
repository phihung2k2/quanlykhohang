import { ENV } from "@/configs";

export const uploadImgConfig = "image/png, image/gif, image/jpeg, image/jpg, image/heic";

export const typeImg = {
    PNG: "image/png",
    GIF: "image/gif",
    JPEG: "image/jpeg",
    JPG: "image/jpg",
    HEIC: "image/heic",
};

export function checkType(type: string) {
    const isJpgOrPng =
        type === typeImg.PNG ||
        type === typeImg.GIF ||
        type === typeImg.HEIC ||
        type === typeImg.JPEG ||
        type === typeImg.JPG;

    return isJpgOrPng;
}

const { IMAGE_URI } = ENV;

/**
 * It takes a string as an argument and returns a string
 * @param {string} [name] - The name of the image.
 * @returns A string
 */
export function getUriImage(name?: string) {
    if (!name) {
        return "";
    } else {
        return IMAGE_URI + name;
    }
}

/**
 * It takes a name of an image, and returns a URI to the image
 * @param {string} [name] - The name of the image.
 * @returns the image URI with the name of the image.
 */
export function getUriImageLow(name?: string) {
    const image = getUriImage(name);

    if (!image) {
        return "";
    }
    return IMAGE_URI + "q_auto:low/" + name;
}

/**
 * It takes a name of an image, and returns a URI to the image
 * @param {string} [name] - The name of the image.
 * @returns the image URI with the name of the image.
 */
export function getUriImageMedium(name?: string) {
    const image = getUriImage(name);

    if (!image) {
        return "";
    }
    return IMAGE_URI + "q_auto:best/" + name;
}
