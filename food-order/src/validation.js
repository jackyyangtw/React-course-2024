export const hasValue = (value) => {
    return value.trim() !== "";
};
export const isEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
export const hasMinLength = (value, minLength) => {
    return value.trim().length >= minLength;
};
