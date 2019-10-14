import { combineReducers } from 'redux';
import authReducer from './authReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    queries: searchReducer,
})

export default rootReducer;
