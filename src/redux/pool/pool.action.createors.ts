import { RootState } from './../combile';
import { Action, ActionType } from './../action.types';
import { Dispatch } from 'redux';
import Pool from '../../contracts/Pool.json';
import { getHaoBalance } from '../web3/web3.action.creators';

export const getPool = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const state = getState();
    const account = state.web3.account;
    const networkId = state.web3.networkId;
    const web3 = state.web3.web3;
    const poolData = (Pool.networks as any)[`${networkId}`];

    if (poolData && web3) {
      const pool = new web3.eth.Contract(Pool.abi as any, poolData.address);
      const totalStaked = await pool.methods.totalStaked().call();

      const accountStaked = await pool.methods.stakeBalance(account).call();
      dispatch({
        type: ActionType.SET_POOL_INFO,
        payload: {
          pool,
          poolData,
          totalStaked,
          accountStaked,
        },
      });
    }
  };
};

export const stake = (stakewei: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const state = getState();
    const account = state.web3.account;
    const web3 = state.web3.web3;
    const hao = state.web3.hao;
    const pool = state.pool.pool;
    const poolData = state.pool.poolData;
    if (web3 && pool && poolData && hao) {
      await hao.methods
        .approve(poolData.address, stakewei)
        .send({ from: account });
      await pool.methods.stake(stakewei).send({ from: account });
    }
    dispatch(getPool() as any);
    dispatch(getHaoBalance() as any);
    dispatch({
      type: ActionType.CLOSE_STAKING,
    });
  };
};

export const unstake = () => {
    return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
      const state = getState();
      const account = state.web3.account;
      const pool = state.pool.pool;
      if (pool) {
        await pool.methods.unstake().send({ from: account });
      }
      dispatch(getPool() as any);
      dispatch(getHaoBalance() as any);
      dispatch({
        type: ActionType.CLOSE_UNSTAKING,
      });
    };
  };
