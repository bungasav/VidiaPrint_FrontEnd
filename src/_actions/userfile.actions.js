import { userfileConstants } from '../_constants';
import { userfileService } from '../_services';
import { alertActions } from './';
import { transaction } from '../_reducers/transaction.reducer';

export const userfileActions = {
    getFiles,
    getTransaction
};

function getFiles() {
    return dispatch => {
        dispatch(request());
        userfileService.getFiles()
            .then(
                userfiles => dispatch(success(userfiles)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userfileConstants.GETFILES_REQUEST } }
    function success(userfiles) { return { type: userfileConstants.GETFILES_SUCCESS, userfiles } }
    function failure(error) { return { type: userfileConstants.GETFILES_FAILURE, error } }
}

function getTransaction() {
    return dispatch => {
        dispatch(request());
        userfileService.getTransaction()
            .then(
                transaction => dispatch(success(transaction)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userfileConstants.GETTRANSACTION_REQUEST } }
    function success(transaction) { return { type: userfileConstants.GETTRANSACTION_SUCCESS, transaction } }
    function failure(error) { return { type: userfileConstants.GETTRANSACTION_FAILURE, error } }
}
