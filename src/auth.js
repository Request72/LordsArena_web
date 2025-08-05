export const isLoggedIn = () => {
    // Check both localStorage and sessionStorage for token
    const localToken = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('token');
    const token = localToken || sessionToken;

    console.log('Auth check - token:', token);

    return !!token;
};

export const getToken = () => {
    // Return token from either localStorage or sessionStorage
    const localToken = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('token');
    return localToken || sessionToken;
};

export const getUsername = () => {
    // Return username from either localStorage or sessionStorage
    const localUsername = localStorage.getItem('username');
    const sessionUsername = sessionStorage.getItem('username');
    return localUsername || sessionUsername;
};

export const logout = () => {
    // Clear both localStorage and sessionStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('keepLoggedIn');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('keepLoggedIn');
};