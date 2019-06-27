import { combineReducers } from 'redux';
import { authReducer } from './reducers/AuthReducer';


export const rootReducer = combineReducers({
    user: authReducer
});
