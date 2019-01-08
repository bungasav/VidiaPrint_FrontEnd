import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { userfiles } from './userfile.reducer';
import { alert } from './alert.reducer';
import { registration } from './registration.reducer';
import { transaction } from './transaction.reducer';
import { confirm } from './confirm.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  userfiles,
  registration,
  transaction,
  confirm,
});

export default rootReducer;