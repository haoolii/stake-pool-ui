import { Action, ActionType } from '../action.types';

export interface State {
  apr: number;
  rewardRate: number;
  totalStaked: number;
  staked: number;
  earned: number;
  staking: boolean;
  unStaking: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  apr: 0,
  rewardRate: 0,
  totalStaked: 0,
  staked: 0,
  earned: 0,
  staking: false,
  unStaking: false,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.GET_POOL_INFO_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ActionType.GET_POOL_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case ActionType.GET_POOL_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionType.OPEN_STAKING:
      return {
        ...state,
        staking: true,
      };
    case ActionType.CLOSE_STAKING:
      return {
        ...state,
        staking: false,
      };
    case ActionType.OPEN_UNSTAKING:
      return {
        ...state,
        unStaking: true,
      };
    case ActionType.CLOSE_UNSTAKING:
      return {
        ...state,
        unStaking: false,
      };
    default:
      return state;
  }
};
export default reducer;
