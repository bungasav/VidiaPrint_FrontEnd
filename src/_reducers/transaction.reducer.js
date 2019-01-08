import { userfileConstants } from '../_constants';

export function transaction(state = {}, action) {
  switch (action.type) {
    case userfileConstants.GETTRANSACTION_REQUEST:
      return {
        loading: true
      };
    case userfileConstants.GETTRANSACTION_SUCCESS:
      return {
        items: action.transaction
      };
    case userfileConstants.GETTRANSACTION_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}