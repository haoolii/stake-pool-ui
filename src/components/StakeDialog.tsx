import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import { Dialog } from '@headlessui/react';

import { RootState } from '../redux/combile';
import * as HaoReducer from '../redux/reducers/hao.reducer';
import * as PoolReducer from '../redux/reducers/pool.reducer';
import * as Web3Reducer from '../redux/reducers/web3.reducer';
import { numberFormat } from '../utils/format';
import Button from './base/Button';

interface Props {
  open: boolean;
  onStake: (amount: number) => void;
  onClose: () => void;
}

export default function StakeDialog({
  open,
  onClose,
  onStake,
}: Props): ReactElement {
  const { balance } = useSelector<RootState, HaoReducer.State>(
    (state) => state.hao as any
  );

  const { web3 } = useSelector<RootState, Web3Reducer.State>(
    (state) => state.web3 as any
  );

  const { staking } = useSelector<RootState, PoolReducer.State>(
    (state) => state.pool as any
  );

  const [stakeNum, setStakeNum] = useState(0);
  const [dirty, setDirty] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatFromWei = (num: Number) => {
    return web3?.utils.fromWei(num.toString(), 'ether');
  };

  const balanceFromWei = formatFromWei(balance);

  const handleInput = (value: number) => {
    setDirty(true);
    if (value) {
      setStakeNum(`${value}` as any);
    } else {
      setStakeNum(0);
    }
  };

  useEffect(() => {
    if (!staking) {
      setDirty(false);
      setStakeNum(0);
    }
  }, [staking]);

  const valid =
    stakeNum > 0 && stakeNum <= (balanceFromWei ? +balanceFromWei : 0);

  const innerOnClose = () => {
    onClose();
    setDirty(false);
    setStakeNum(0);
  };

  const setMax = () => {
    if (balanceFromWei) {
      setStakeNum(+balanceFromWei);
    }
  };

  return (
    <Dialog
      initialFocus={inputRef}
      open={open}
      onClose={innerOnClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black/20" />
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block relative w-full max-w-sm p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <Dialog.Title
            as="h3"
            className="text-2xl font-medium leading-6 text-gray-900 pb-2"
          >
            Stake
          </Dialog.Title>
          <Button type='icon' className="absolute right-5 top-5" onClick={innerOnClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
          <div className="my-4">
            <div>
              <div className="flex justify-between">
                <div className="text-sm font-semibold p-1">AMOUNT</div>
                <div className="text-sm font-semibold p-1">
                  AVAILABLE{' '}
                  {numberFormat(Number(balanceFromWei))}{' '}
                  Hao
                </div>
              </div>
              <div className="relative my-1">
                <input
                  ref={inputRef}
                  type="number"
                  className={`w-full ${!valid && dirty ? 'invalid' : null}`}
                  value={stakeNum}
                  onChange={(e) => handleInput(e.target.valueAsNumber)}
                />
                <button
                  className="absolute right-3 top-2 rounded bg-slate-300  text-xs px-2 py-1 text-slate-600 hover:text-slate-900"
                  onClick={setMax}
                >
                  MAX
                </button>
              </div>
            </div>
          </div>

          <div>
            <Button
              type='primary'
              className='w-full'
              disabled={!valid}
              onClick={(e) => onStake(stakeNum)}
            >
              Stake
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
