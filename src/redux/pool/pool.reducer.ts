import { Action, ActionType } from '../action.types';
export interface State {
  apr: number;
  dailyReward: number;
  totalStaked: number;
  accountStaked: number;
  accountReward: number;
}

const initialState: State = {
  apr: 0,
  dailyReward: 0,
  totalStaked: 0,
  accountStaked: 0,
  accountReward: 0
};
const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_POOL_INFO:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};

export default reducer;
