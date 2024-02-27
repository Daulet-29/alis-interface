export const COOKIE_EXPIRES_IN = 1000 * 60 * 60 * 24 * 365; // 1 year

export const getCurrentTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const currentDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    return currentDate;
}