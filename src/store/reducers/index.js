import { combineReducers } from 'redux';
import authentication from './authentication';
import order from './order';


const reducers = combineReducers({
    authentication: authentication,
    order: order
});

export default reducers;