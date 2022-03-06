import { Dispatch } from 'redux';
import { Action, ActionType } from '../action.types';
import Hao from '../../contracts/Hao.json';
import Pool from '../../contracts/Pool.json';
import { RootState } from '../combile';

export const init = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { web3, networkId } = getState().web3;

    dispatch({
      type: ActionType.INIT_CONTRACT_PENDING,
    });

    try {
      const haoData = (Hao.networks as any)[`${networkId}`];
      const hao = new web3!.eth.Contract(Hao.abi as any, haoData.address);

      const poolData = (Pool.networks as any)[`${networkId}`];
      const pool = new web3!.eth.Contract(Pool.abi as any, poolData.address);

      dispatch({
        type: ActionType.INIT_CONTRACT_SUCCESS,
        payload: {
          haoData,
          hao,
          poolData,
          pool,
        },
      });
    } catch (err) {
      dispatch({
        type: ActionType.INIT_CONTRACT_FAIL,
        payload: err,
      });
    }
  };
};
