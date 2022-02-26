import { RooState } from './../combile';
import { Action, ActionType } from './../action.types';
import { Dispatch } from 'redux';
import Pool from "../../contracts/Pool.json";

export const getPool = () => {
    return async (dispatch: Dispatch<Action>, getState: () => RooState) => {
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
                    totalStaked,
                    accountStaked
                }
            })
        }
    }
}
