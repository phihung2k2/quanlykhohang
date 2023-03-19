const { VITE_API_ENDPOINT } = import.meta.env;
const { VITE_BASE_URL } = import.meta.env;
// import { convertMiliSeconds } from "@/utils";
// api

const { VITE_LOGIN_GOOGLE_CLIENT_ID, VITE_LOGIN_GOOGLE_REDIRECT_URIS, VITE_LOGIN_GOOGLE_HOME_URIS, VITE_CLOUDINARY } =
    import.meta.env;

const API = {
    BASE_URL: VITE_BASE_URL as string,
    API_ENDPOINT: VITE_API_ENDPOINT as string,
    // API_TIMEOUT: convertMiliSeconds(VITE_API_TIMEOUT).getFromSeconds(),
};

const IMAGE_URI = VITE_CLOUDINARY as string;

const GOOGLE_LOGIN = {
    CLIENT_ID: VITE_LOGIN_GOOGLE_CLIENT_ID as string,
    REDIRECT_URIS: VITE_LOGIN_GOOGLE_REDIRECT_URIS as string,
    HOME_URIS: VITE_LOGIN_GOOGLE_HOME_URIS as string,
};

export const ENV = {
    API: { ...API },
    GOOGLE_LOGIN: { ...GOOGLE_LOGIN },
    IMAGE_URI,
};
