import { RootState } from './../combile';
import { Dispatch } from 'redux';
import { Action, ActionType } from '../action.types';
import * as HaoCreators from './hao.action.creators';

export const getPoolInfo = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch({
      type: ActionType.GET_POOL_INFO_PENDING,
    });

    try {
      const state = getState();
      const { pool } = state.contract;
      const { account } = state.account;
      if (pool) {
        let totalStaked = await pool.methods.totalStaked().call();
        let staked = await pool.methods.stakeBalance(account).call();
        let rewardRate = await pool.methods.rewardRate().call();
        let earned = await pool.methods.earned(account).call();

        dispatch({
          type: ActionType.GET_POOL_INFO_SUCCESS,
          payload: {
            totalStaked,
            staked,
            earned,
            rewardRate
          },
        });
      }
    } catch (err) {
      dispatch({
        type: ActionType.GET_POOL_INFO_FAIL,
        payload: err,
      });
    }
  };
};

export const stake = (amount: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const state = getState();
    const { hao, pool, poolData } = state.contract;
    const { account } = state.account;

    if (pool && hao) {
      await hao.methods
        .approve(poolData.address, amount)
        .send({ from: account });
      await pool.methods.stake(amount).send({ from: account });
      dispatch(HaoCreators.getHaoBalance() as any);
      dispatch(getPoolInfo() as any);
      dispatch({
        type: ActionType.CLOSE_STAKING,
      });
    }
  };
};

export const unstake = (amount: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const state = getState();
    const { pool } = state.contract;
    const { account } = state.account;
    if (pool) {
      await pool.methods.unstake(amount).send({ from: account });
      dispatch(HaoCreators.getHaoBalance() as any);
      dispatch(getPoolInfo() as any);
      dispatch({
        type: ActionType.CLOSE_UNSTAKING,
      });
    }
  }
};
