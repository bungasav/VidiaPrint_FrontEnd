import { userConstants } from '../_constants';

export function confirm(state = {}, action) {
  switch (action.type) {
    case userConstants.CONFIRM_REQUEST:
      return {
        loading: true
      };
    case userConstants.CONFIRM_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.CONFIRM_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}