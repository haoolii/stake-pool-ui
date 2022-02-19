import { combineReducers } from 'redux';
import * as web3Reducer from './web3/web3.reducer';

const reducers = combineReducers({
    web3: web3Reducer.web3Reducer
});

export default reducers;
export type RooState = ReturnType<typeof reducers>;