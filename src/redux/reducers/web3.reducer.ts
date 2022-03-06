import { Action, ActionType } from '../action.types';
import Web3 from 'web3';

export interface State {
  web3: Web3 | null;
  networkId: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  web3: null,
  networkId: null,
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
        loading: false,
        web3: action.payload,
      };
    case ActionType.INIT_WEB3_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionType.INIT_NETWORK_PENDING:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case ActionType.INIT_NETWORK_SUCCESS:
      return {
        ...state,
        networkId: action.payload,
        loading: false,
      };
    case ActionType.INIT_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
