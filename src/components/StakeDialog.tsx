import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/combile';
import * as Web3Reducer from '../redux/web3/web3.reducer';
import * as PoolReducer from '../redux/pool/pool.reducer';

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
  const { web3, loading, error, account, haoBalance } = useSelector<
    RootState,
    Web3Reducer.State
  >((state) => state.web3);

  const { staking } = useSelector<RootState, PoolReducer.State>(
    (state) => state.pool
  );

  const [stakeNum, setStakeNum] = useState(0);
  const [dirty, setDirty] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formmatFromWei = (num: Number) => {
    return web3?.utils.fromWei(num.toString(), 'ether');
  };

  const haoBalanceFromWei = formmatFromWei(haoBalance);

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
    stakeNum > 0 && stakeNum <= (haoBalanceFromWei ? +haoBalanceFromWei : 0);

  const innerOnClose = () => {
    onClose();
    setDirty(false);
    setStakeNum(0);
  };

  const setMax = () => {
    if (haoBalanceFromWei) {
      setStakeNum(+haoBalanceFromWei);
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
          <button className="absolute right-6 top-6" onClick={innerOnClose}>
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
                  AVAILABLE{' '}
                  {haoBalanceFromWei
                    ? Number(haoBalanceFromWei).toLocaleString()
                    : 0}{' '}
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
              onClick={(e) => onStake(stakeNum)}
            >
              Stake
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
