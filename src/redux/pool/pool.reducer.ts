import { Action, ActionType } from '../action.types';
import { Contract } from 'web3-eth-contract';
import Pool from '../../contracts/Pool.json';

export interface State {
  poolData: any;
  pool: Contract | null;
  apr: number;
  dailyReward: number;
  totalStaked: number;
  accountStaked: number;
  accountReward: number;
  staking: boolean;
  unStaking: boolean;
}

const initialState: State = {
  poolData: null,
  pool: null,
  apr: 0,
  dailyReward: 0,
  totalStaked: 0,
  accountStaked: 0,
  accountReward: 0,
  staking: false,
  unStaking: false
};
const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_POOL_INFO:
      return {
        ...state,
        ...action.payload
      }
    case ActionType.OPEN_STAKING:
      return {
        ...state,
        staking: true
      }
    case ActionType.CLOSE_STAKING:
        return {
          ...state,
          staking: false
        }
    case ActionType.OPEN_UNSTAKING:
      return {
        ...state,
        unStaking: true
      }
    case ActionType.CLOSE_UNSTAKING:
        return {
          ...state,
          unStaking: false
        }
    default:
      return state;
  }
};

export default reducer;
