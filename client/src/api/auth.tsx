// api.js
const BASE_URL = 'http://localhost:3000/api';

export const signup = async (username, email, password) => {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });
    return response.json();
};

export const signin = async (identifier, password) => {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identifier, password })
    });
    return response.json();
};
