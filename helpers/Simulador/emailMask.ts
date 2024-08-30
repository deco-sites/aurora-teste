export const emailLengthMask = (email: string): boolean => {
    return /^[a-z0-9@._-]{0,256}$/.test(email);
};
