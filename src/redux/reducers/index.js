import {combineReducers} from '@reduxjs/toolkit';
import UserReducer from './UserReducer';
import AuthReducer from './AuthReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  users: UserReducer,
});
export default rootReducer;
