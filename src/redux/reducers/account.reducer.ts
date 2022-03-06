import { Action, ActionType } from '../action.types';
export interface State {
  account: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  account: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.INIT_ACCOUNT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ActionType.INIT_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload,
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
