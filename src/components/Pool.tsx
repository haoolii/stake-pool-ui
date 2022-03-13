import React from 'react';

import { useDispatch } from 'react-redux';

import usePool from '../hooks/pool';
import { ActionType } from '../redux/action.types';
import * as PoolCreators from '../redux/creators/pool.action.creators';
import {
  fromWei,
  numberFormat,
} from '../utils/format';
import Button from './base/Button';
import ClaimDialog from './ClaimDialog';
import StakeDialog from './StakeDialog';
import UnStakeDialog from './UnStakeDialog';

export default function Pool() {
  const dispatch = useDispatch();

  const {
    totalStaked,
    rewardRate,
    staked,
    earned,
    staking,
    unStaking,
    web3,
    balance,
    claiming,
    account,
  } = usePool();

  const balanceFromWei = fromWei(web3!, balance);
  const totalStakedFromWei = fromWei(web3!, totalStaked);
  const rewardRateFromWei = fromWei(web3!, rewardRate);
  const stakedFromWei = fromWei(web3!, staked);
  const earnedFromWei = fromWei(web3!, earned);
  const dailyReward = Number(rewardRateFromWei) * 86400;

  const onStake = (amount: number) => {
    if (web3) {
      dispatch(PoolCreators.stake(web3.utils.toWei(`${amount}`)));
    }
  };

  const onUnStake = (amount: number) => {
    if (web3) {
      dispatch(PoolCreators.unstake(web3.utils.toWei(`${amount}`)));
    }
  };

  const onClaiming = () => {
    if (web3) {
      dispatch(PoolCreators.getReward());
    }
  };

  const closeStaking = () => {
    dispatch({
      type: ActionType.CLOSE_STAKING,
    });
  };

  const closeUnStaking = () => {
    dispatch({
      type: ActionType.CLOSE_UNSTAKING,
    });
  };

  const openStaking = () => {
    dispatch({
      type: ActionType.OPEN_STAKING,
    });
  };

  const openUnStaking = () => {
    dispatch({
      type: ActionType.OPEN_UNSTAKING,
    });
  };

  const openClaiming = () => {
    dispatch({
      type: ActionType.OPEN_CLAIMING,
    });
  };

  const closeClaiming = () => {
    dispatch({
      type: ActionType.CLOSE_CLAIMING,
    });
  };

  const aprDisplay =
    dailyReward === 0 || +totalStakedFromWei === 0
      ? 0
      : ((dailyReward * 365) / +totalStakedFromWei) * 100;

  return (
    <div className="bg-slate-200/40  backdrop-blur rounded-2xl w-full md:w-[468px] p-8 space-y-4 flex flex-col">
      <div className="flex space-y-2 flex-col md:space-y-0 md:flex-row justify-between border-b border-slate-500 pb-4">
        <div className="flex flex-1">
          <div className="flex flex-1  flex-col">
            <div className="text-xs font-bold tracking-wider">TOTAL STAKED</div>
            <div className="text-xs font-medium">
              {account ? numberFormat(+totalStakedFromWei) : '--'} Hao
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="text-xs font-bold tracking-wider">DAILY REWARD</div>
            <div className="text-xs font-medium">
              {account ? numberFormat(dailyReward) : '-'} Hao / Day
            </div>
          </div>
        </div>
        <div className="flex md:ml-10 md:items-end flex-col">
          <div className="text-xs font-bold tracking-wider">APR</div>
          <div className="text-xs font-medium">{account ? numberFormat(aprDisplay) : '--'}%</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-xs font-bold tracking-wider">
            AVAILABLE IN WALLET
          </div>
          <div className="text-2xl font-medium">
            {account ? numberFormat(Number(balanceFromWei)) : '-'}
            <span className="text-sm font-medium ml-2">Hao</span>
          </div>
        </div>

        <div>
          <div className="text-xs font-bold tracking-wider">TOTAL STAKED</div>
          <div className="text-2xl font-medium">
            {account ? numberFormat(Number(stakedFromWei)) : '-'}
            <span className="text-sm font-medium ml-2">Hao</span>
          </div>
        </div>
      </div>

      <div className="flex-1"></div>

      {account ? (
        <div className='flex flex-col space-y-4'>
          <div className="bg-slate-400 rounded-md px-4 py-3 flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between items-center">
            <div className="w-full">
              <div className="font-bold text-white tracking-wider">
                CLAIMABLE REWARDS
              </div>
              <div className="text-xl font-medium text-white">
                {numberFormat(Number(earnedFromWei))}
                <span className="text-sm ml-2">Hao</span>
              </div>
            </div>
            <Button
              type="primary"
              disabled={Number(earnedFromWei) === 0}
              onClick={openClaiming}
              className="bg-slate-500 w-full md:w-auto"
            >
              Claim
            </Button>
          </div>
          <div className="flex flex-col space-y-4">
            <Button type="primary" onClick={openStaking}>
              Stake
            </Button>
            <Button
              onClick={openUnStaking}
              disabled={Number(totalStakedFromWei) === 0}
            >
              Unstake
            </Button>
          </div>
        </div>
      ) : (
        <Button type="primary">
          Connect Wallet
        </Button>
      )}

      <ClaimDialog
        open={claiming}
        onClaiming={() => onClaiming()}
        onClose={closeClaiming}
      />
      <StakeDialog
        onStake={(amount: number) => onStake(amount)}
        open={staking}
        onClose={closeStaking}
      />
      <UnStakeDialog
        onUnStake={(amount: number) => onUnStake(amount)}
        open={unStaking}
        onClose={closeUnStaking}
      />
    </div>
  );
}
