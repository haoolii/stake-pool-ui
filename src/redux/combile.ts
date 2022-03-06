import { combineReducers } from 'redux';

import haoReducer from './reducers/hao.reducer';
import accountReducer from './reducers/account.reducer';
import web3Reducer from './reducers/web3.reducer';
import poolReducer from './reducers/pool.reducer';
import contractReducer from './reducers/contract.reducer';

const reducers = combineReducers({
    account: accountReducer,
    contract: contractReducer,
    web3: web3Reducer,
    pool: poolReducer,
    hao: haoReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;