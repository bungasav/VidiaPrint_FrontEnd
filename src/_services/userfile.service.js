import { authHeader } from '../_helpers';

export const userfileService = {
    getFiles,
    getTransaction
};

function getFiles() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log(authHeader());
    return fetch('https://api.vidiaprint.com/upload/api/UserFiles', requestOptions).then(handleResponse);
}

function getTransaction() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch('https://api.vidiaprint.com/upload/api/transactions', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}