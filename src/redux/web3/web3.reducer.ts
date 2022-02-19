import Web3 from 'web3';
import { Action, ActionType } from './web3.action.types';
export interface State {
  web3: Web3 | null;
  account: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  web3: null,
  account: null,
  loading: false,
  error: null,
};

export const web3Reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.INIT_WEB3_PENDING:
      return {
        ...state,
        loading: true
      };
    case ActionType.INIT_WEB3_SUCCESS:
      return {
        ...state,
        web3: action.payload,
        loading: false
      };
    case ActionType.INIT_WEB3_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ActionType.GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload
      }
    default:
      return state;
  }
};
