import { Dispatch } from "redux";
import Web3 from "web3";
import { Action, ActionType } from "../action.types";
import Hao from "../../contracts/Hao.json";

declare const window: any;

export const initWeb3 = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.INIT_WEB3_PENDING,
    });

    try {
      let web3: Web3 | null = null;

      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      } else {
        alert("No ethereum browser detected! You can check out MetaMask!");
      }

      dispatch({
        type: ActionType.INIT_WEB3_SUCCESS,
        payload: web3!,
      });

      const accounts = await web3!.eth.getAccounts();
      const account = accounts[0];

      dispatch({
        type: ActionType.GET_ACCOUNT_SUCCESS,
        payload: account,
      });

      const networkId = await web3?.eth.net.getId();

      dispatch({
        type: ActionType.SET_NETWORK_ID,
        payload: networkId,
      });

      const haoData = (Hao.networks as any)[`${networkId}`];

      if (haoData && web3) {
        const hao = new web3.eth.Contract(Hao.abi as any, haoData.address);      
        let haoBalance = await hao.methods.balanceOf(account).call();
        dispatch({
          type: ActionType.SET_HAO_BALANCE,
          payload: haoBalance,
        });
      }
    } catch (err) {
      dispatch({
        type: ActionType.INIT_WEB3_FAIL,
        payload: "INIT_WEB3_FAIL",
      });
    }
  };
};
