/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from 'react-redux';

import { RootState } from '../redux/combile';
import * as HaoReducer from '../redux/reducers/hao.reducer';
import * as PoolReducer from '../redux/reducers/pool.reducer';
import * as Web3Reducer from '../redux/reducers/web3.reducer';

export default function usePool() {
  const {
    totalStaked,
    rewardRate,
    staked,
    earned,
    staking,
    unStaking,
    claiming,
    loading,
    error,
  } = useSelector<RootState, PoolReducer.State>((state) => state.pool as any);

  const { web3 } = useSelector<RootState, Web3Reducer.State>(
    (state) => state.web3 as any
  );

  const { balance } = useSelector<RootState, HaoReducer.State>(
    (state) => state.hao as any
  );
  return {
    totalStaked,
    rewardRate,
    staked,
    earned,
    staking,
    unStaking,
    claiming,
    loading: '',
    error: '',
    web3,
    balance,
  };
}
