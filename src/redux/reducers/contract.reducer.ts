import { Action, ActionType } from '../action.types';
import { Contract } from 'web3-eth-contract';

export interface State {
  hao: Contract | null;
  haoData: any;
  pool: Contract | null;
  poolData: any;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  hao: null,
  haoData: null,
  pool: null,
  poolData: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.INIT_CONTRACT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ActionType.INIT_CONTRACT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case ActionType.INIT_CONTRACT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
