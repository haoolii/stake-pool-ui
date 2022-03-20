import './App.css';

import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Route,
  Routes,
} from 'react-router-dom';

import Header from './components/Header';
import { Home } from './page/Home';
import Stake from './page/Stake';
import { RootState } from './redux/combile';
import * as AccountCreators from './redux/creators/account.action.creators';
import * as ContractCreators from './redux/creators/contract.action.creators';
import * as HaoCreators from './redux/creators/hao.action.creators';
import * as PoolCreators from './redux/creators/pool.action.creators';
import * as Web3Creators from './redux/creators/web3.action.creators';
import * as AccountReducer from './redux/reducers/account.reducer';
import * as ContractReducer from './redux/reducers/contract.reducer';
import * as Web3Reducer from './redux/reducers/web3.reducer';

declare const window: any;

function App() {
  const dispatch = useDispatch();

  const { web3, networkId, loading, error } = useSelector<
    RootState,
    Web3Reducer.State
  >((state) => state.web3 as any);

  const { account } = useSelector<RootState, AccountReducer.State>(
    (state) => state.account as any
  );

  const { hao } = useSelector<RootState, ContractReducer.State>(
    (state) => state.contract as any
  );

  useEffect(() => {
    dispatch(Web3Creators.init());

    const accountsChangedCb = function (accounts: string[]) {
      console.log('accountsChanges', accounts);
      dispatch(Web3Creators.init());
    };

    const networkChangedCb = function (networkId: string) {
      console.log('networkChanged', networkId);
      dispatch(Web3Creators.init());
    };

    window.ethereum?.on('accountsChanged', accountsChangedCb);

    window.ethereum?.on('networkChanged', networkChangedCb);

    return () => {
      window.ethereum.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (web3) {
      dispatch(AccountCreators.init());
    }
  }, [web3]);

  useEffect(() => {
    if (networkId) {
      dispatch(ContractCreators.init());
    }
  }, [networkId]);

  useEffect(() => {
    if (hao && account) {
      dispatch(HaoCreators.getHaoBalance());
      dispatch(PoolCreators.getPoolInfo());
    }
  }, [hao, account]);

  return (
    <>
      <div className="h-full relative">
        <div className="container mx-auto h-full w-full relative z-10 px-4">
          <Header />
          <div className="flex justify-center items-center h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="stake" element={<Stake />} />
            </Routes>
          </div>
        </div>

        <div className="absolute w-full h-full top-0 left-0 z-0 flex items-center justify-center">
          <div className="relative container mx-auto">
            <div className="w-96 h-96 -top-14 right-20 absolute bg-purple-300 rounded-full mix-blend-multiply blur-3xl filter opacity-70 transform animate-blob"></div>
            <div className="w-96 h-96 -top-44 right-48 absolute bg-yellow-300 rounded-full mix-blend-multiply blur-3xl filter opacity-70 animate-blob animation-delay-2000"></div>
            <div className="w-96 h-96 -top-2 right-64 absolute bg-pink-300 rounded-full mix-blend-multiply blur-3xl filter opacity-70 transform animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
