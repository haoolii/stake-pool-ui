import { Action, ActionType } from '../action.types';

export interface State {
  balance: number;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  balance: 0,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.GET_HAO_BALANCE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ActionType.GET_HAO_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        balance: action.payload,
      };
    case ActionType.GET_HAO_BALANCE_FAIL:
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
