import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './alert.action';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    forgotpass,
    confirm
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/#/upload');
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) {
        return { type: userConstants.LOGIN_SUCCESS, user }
    }
    function failure(error) {
        return { type: userConstants.LOGIN_FAILURE, error }
    }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('Registration successful, Please Check Your Email'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Registration failed"));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function forgotpass(email) {
    return dispatch => {
        dispatch(request(email));

        userService.forgotpass(email)
            .then(
                email => {
                    dispatch(success());
                    dispatch(alertActions.success("Reset Password success, check your email"));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Reset Password failed"));
                }
            );
    };

    function request(user) { return { type: userConstants.FORGOT_REQUEST, user } }
    function success(user) { return { type: userConstants.FORGOT_SUCCESS, user } }
    function failure(error) { return { type: userConstants.FORGOT_FAILURE, error } }
}

function confirm(path) {
    return dispatch => {
        dispatch(request(path));

        userService.confirm(path)
            .then(
                path => {
                    dispatch(success());
                    dispatch(alertActions.success('Thank You, your account has been verified'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error("Sorry, your token is failed"));
                }
            );
    };
    function request(user) { return { type: userConstants.CONFIRM_REQUEST, user } }
    function success(user) { return { type: userConstants.CONFIRM_SUCCESS, user } }
    function failure(error) { return { type: userConstants.CONFIRM_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}