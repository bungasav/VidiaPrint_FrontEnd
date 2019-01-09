import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    confirm
};

function login(username, password) {
    debugger;
    const param = new URLSearchParams();
    param.append('grant_type', 'password');
    param.append('username', username),
        param.append('password', password);
    const requestOptions = {
        method: "POST",
        headers: {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: param.toString(),
        json: true

    };
    console.log(param.toString())
    return fetch('https://api.vidiaprint.com/upload/token', requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.json()
                    .then(function (err) {
                        return Promise.reject(err.error_description);

                    })
                return Promise.reject(response.error_description);
            }
            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    debugger;
    const parser = new DOMParser();
    const param = new URLSearchParams();
    param.append('email', encodeURIComponent(user.email));
    param.append('password', encodeURIComponent(user.password)),
        param.append('confirmpassword', encodeURIComponent(user.confirmpassword));
    param.append('phonenumber', user.phone);
    param.append('fullname', user.fullname);
    param.append('dateofbirth', user.birthdate);
    param.append('gender', user.gender);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: decodeURIComponent(param.toString()),
        json: true

    };

    console.log(param.toString());
    return fetch('https://api.vidiaprint.com/upload/api/account/register', requestOptions).then(handleResponse);
}

function confirm(path) {
    debugger;
    const param = new URLSearchParams();
    param.append('userid', path);
    console.log(path);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body : decodeURIComponent(param.toString()),
            json: true
    };

    return fetch('https://api.vidiaprint.com/upload/api/account/confirmemail', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    debugger;
    // if (response.body != null) {
    //     return response.json();
    // }
    // else {
    return Promise.resolve();
    // }
}