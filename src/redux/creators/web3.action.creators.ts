import { Dispatch } from 'redux';
import Web3 from 'web3';

import {
  Action,
  ActionType,
} from '../action.types';

declare const window: any;

export const init = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.INIT_WEB3_PENDING,
    });

    dispatch({
      type: ActionType.INIT_NETWORK_PENDING
    })

    try {
      let web3: Web3 | null = null;

      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      } else {
        alert('No ethereum browser detected! You can check out MetaMask!');
      }

      dispatch({
        type: ActionType.INIT_WEB3_SUCCESS,
        payload: web3!,
      });

      const networkId = await web3?.eth.net.getId();
      console.log('networkId', networkId)
      dispatch({
        type: ActionType.INIT_NETWORK_SUCCESS,
        payload: networkId
      });
      
    } catch (err) {
      dispatch({
        type: ActionType.INIT_WEB3_FAIL,
        payload: err,
      });

      dispatch({
        type: ActionType.INIT_NETWORK_FAIL,
        payload: err,
      });
    }
  };
};
