import { Dispatch } from 'redux';
import { Action, ActionType } from '../action.types';
import { RootState } from '../combile';

export const getHaoBalance = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch({
      type: ActionType.GET_HAO_BALANCE_PENDING,
    });

    try {
      const state = getState();
      const { hao } = state.contract;
      const { account } = state.account;
      if (hao) {
        let haoBalance = await hao.methods.balanceOf(account).call();
        dispatch({
          type: ActionType.GET_HAO_BALANCE_SUCCESS,
          payload: haoBalance,
        });
      }
    } catch (err) {
      dispatch({
        type: ActionType.GET_HAO_BALANCE_FAIL,
        payload: err,
      });
    }
  };
};
