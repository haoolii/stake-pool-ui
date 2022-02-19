import { Dispatch } from "redux";
import Web3 from "web3";
import { Action, ActionType } from "./web3.action.types";

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
      dispatch({
          type: ActionType.GET_ACCOUNT_SUCCESS,
          payload: accounts[0]
      })
    } catch (err) {
      dispatch({
        type: ActionType.INIT_WEB3_FAIL,
        payload: "INIT_WEB3_FAIL",
      });
    }
  };
};