import { userfileConstants } from '../_constants';

export function userfiles(state = {}, action) {
  switch (action.type) {
    case userfileConstants.GETFILES_REQUEST:
      return {
        loading: true
      };
    case userfileConstants.GETFILES_SUCCESS:
      return {
        items: action.userfiles
      };
    case userfileConstants.GETFILES_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}