import dayjs from "dayjs";

function checkNumber(isCheck: boolean, callback: () => void) {
    if (isCheck) {
        return callback();
    }
}

/**
 * It takes a number and returns an object with three functions that convert the number to miliseconds,
 * seconds, and minutes
 * @param {any} number - any
 * @returns An object with three functions.
 */
export function convertMiliSeconds(number: any) {
    const isCheck = isNaN(number); // NaN

    let miliSeconds = 0;

    /**
     * It converts seconds to miliseconds.
     * @returns miliSeconds
     */
    function getFromSeconds() {
        checkNumber(!isCheck, () => {
            miliSeconds = number * 1_000;
        });
        return miliSeconds;
    }

    /**
     * It converts minutes to milliseconds.
     * @returns the miliSeconds variable.
     */
    function getFromMinute() {
        checkNumber(!isCheck, () => {
            miliSeconds = number * 60_000;
        });
        return miliSeconds;
    }

    /**
     * It converts hours to miliseconds.
     * @returns the miliSeconds variable.
     */
    function getFromHour() {
        checkNumber(!isCheck, () => {
            miliSeconds = number * 3_600_000;
        });
        return miliSeconds;
    }

    return { getFromSeconds, getFromMinute, getFromHour };
}

/**
 * It takes a Date object and returns a string in the format "DD/MM/YYYY - HH:mm:ss"
 * @param {Date} time - The time you want to convert
 * @returns A string with the date and time in the format DD/MM/YYYY - HH:mm:ss
 */
export function getBasicTimeFromTimeStamp(time?: Date): any {
    return dayjs(time).format("DD/MM/YYYY - HH:mm:ss");
}

/**
 * It takes a date object and returns a string in the format of "DD/MM/YYYY"
 * @param {Date} [time] - The time you want to convert.
 * @returns A string in the format of DD/MM/YYYY
 */
export function getDayTimeFromTimeStamp(time?: Date): any {
    return dayjs(time).format("DD/MM/YYYY");
}
