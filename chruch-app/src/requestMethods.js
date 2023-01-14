import axios from 'axios';
const url = 'http://localhost:5000';

let token;

// if token exists in local storage we set the token variable
localStorage.getItem('persist:root') === null ?
    token = null :
    token = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken;

// Public Requests
export const publicRequest = axios.create({
    baseURL: url,
});

// Private Requests
export const userRequest = axios.create({
    baseURL: url,
    headers: {
        authorization: `Bearer ${token}`
    }
});
