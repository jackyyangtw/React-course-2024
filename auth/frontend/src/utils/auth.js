import { redirect } from "react-router-dom";
export const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0) {
        return "EXPIRED";
    }

    return token;
};

export const tokenLoader = () => getAuthToken();

export const checkAuthLoader = () => {
    const token = getAuthToken();
    if (!token) {
        return redirect("/auth");
    }
    return null;
};

export const getTokenDuration = () => {
    const expiration = localStorage.getItem("expiration");
    const expirationDate = new Date(expiration);
    const current = new Date();
    const duration = expirationDate.getTime() - current.getTime();
    return duration;
};
