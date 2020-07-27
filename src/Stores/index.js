import { combineReducers } from 'redux';

import UserDataReducer from './Reducers/UserDataReducer';

const allReducers = combineReducers({
    user: UserDataReducer
});

export default allReducers;