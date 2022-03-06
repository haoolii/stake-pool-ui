import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/combile';
import * as Web3Reducer from '../redux/reducers/web3.reducer';
import * as PoolReducer from '../redux/reducers/pool.reducer';
interface Props {
  open: boolean;
  onUnStake: (amount: number) => void;
  onClose: () => void;
}

export default function UnStakeDialog({
  open,
  onClose,
  onUnStake,
}: Props): ReactElement {
  const { staked } = useSelector<RootState, PoolReducer.State>(
    (state) => state.pool
  );

  const { web3 } = useSelector<RootState, Web3Reducer.State>(
    (state) => state.web3
  );

  const { unStaking } = useSelector<RootState, PoolReducer.State>(
    (state) => state.pool as any
  );

  const [unstakeNum, setUnstakeNum] = useState(0);
  const [dirty, setDirty] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatFromWei = (num: Number) => {
    return web3?.utils.fromWei(num.toString(), 'ether');
  };

  const stakedFromWei = formatFromWei(staked);

  const handleInput = (value: number) => {
    setDirty(true);
    if (value) {
      setUnstakeNum(`${value}` as any);
    } else {
      setUnstakeNum(0);
    }
  };

  useEffect(() => {
    if (!unStaking) {
      setDirty(false);
      setUnstakeNum(0);
    }
  }, [unStaking]);

  const valid =
    unstakeNum > 0 && unstakeNum <= (stakedFromWei ? +stakedFromWei : 0);

  const innerOnClose = () => {
    onClose();
    setDirty(false);
    setUnstakeNum(0);
  };

  const setMax = () => {
    if (stakedFromWei) {
      setUnstakeNum(+stakedFromWei);
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
            Unstake
          </Dialog.Title>
          <button className="absolute right-6 top-6">
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
          </button>
          <div className="my-4">
            <div>
              <div className="flex justify-between">
                <div className="text-sm font-semibold p-1">AMOUNT</div>
                <div className="text-sm font-semibold p-1">
                  AVAILABLE {Number(stakedFromWei).toLocaleString()}
                  Hao
                </div>
              </div>
              <div className="relative my-1">
                <input
                  ref={inputRef}
                  type="number"
                  className={`w-full ${!valid && dirty ? 'invalid' : null}`}
                  value={unstakeNum}
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
            <button
              type="button"
              className="
                inline-flex
                justify-center
                w-full
                py-2
                text-sm 
                font-medium 
                text-white
                bg-slate-400
                border
                border-transparent 
                rounded-md 
                hover:bg-slate-400
            "
              disabled={!valid}
              onClick={(e) => onUnStake(unstakeNum)}
            >
              Unstake
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
