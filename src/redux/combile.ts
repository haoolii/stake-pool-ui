import { combineReducers } from 'redux';
import web3Reducer  from './web3/web3.reducer';
import poolReducer from './pool/pool.reducer';

const reducers = combineReducers({
    web3: web3Reducer,
    pool: poolReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;