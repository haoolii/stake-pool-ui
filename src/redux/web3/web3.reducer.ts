import Web3 from "web3";
import { Action, ActionType } from "../action.types";
import { Contract } from 'web3-eth-contract';

export interface State {
  web3: Web3 | null;
  hao: Contract | null;
  account: string | null;
  networkId: number | null;
  haoBalance: number;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  web3: null,
  hao: null,
  account: null,
  networkId: null,
  haoBalance: 0,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.INIT_WEB3_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ActionType.INIT_WEB3_SUCCESS:
      return {
        ...state,
        web3: action.payload,
        loading: false,
      };
    case ActionType.INIT_WEB3_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionType.GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload,
      };
    case ActionType.SET_NETWORK_ID:
      return {
        ...state,
        networkId: action.payload,
      };
    case ActionType.SET_HAO_BALANCE:
      return {
        ...state,
        haoBalance: action.payload,
      };
    case ActionType.SET_HAO_CONTRACT:
      return {
        ...state,
        hao: action.payload
      }
    default:
      return state;
  }
};

export default reducer;