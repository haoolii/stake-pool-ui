import { Action, ActionType } from './../action.types';
import { Dispatch } from 'redux';
import { RootState } from '../combile';

export const init = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch({
      type: ActionType.INIT_ACCOUNT_PENDING,
    });

    const { web3 } = getState().web3;

    if (web3) {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      dispatch({
        type: ActionType.INIT_ACCOUNT_SUCCESS,
        payload: account,
      });

    } else {
      dispatch({
        type: ActionType.INIT_ACCOUNT_FAIL,
        payload: 'INIT_ACCOUNT_FAIL',
      });
    }
  };
};
