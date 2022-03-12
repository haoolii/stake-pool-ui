import React, {
  ReactElement,
  useRef,
} from 'react';

import { useSelector } from 'react-redux';

import { Dialog } from '@headlessui/react';

import { RootState } from '../redux/combile';
import * as PoolReducer from '../redux/reducers/pool.reducer';
import * as Web3Reducer from '../redux/reducers/web3.reducer';
import {
  fromWei,
  numberFormat,
} from '../utils/format';
import Button from './base/Button';

interface Props {
  open: boolean;
  onClaiming: () => void;
  onClose: () => void;
}

export default function ClaimDialog({ open, onClose, onClaiming }: Props): ReactElement {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    earned
  } = useSelector<RootState, PoolReducer.State>((state) => state.pool as any);
  const { web3 } = useSelector<RootState, Web3Reducer.State>(
    (state) => state.web3 as any
  );
  const earnedFromWei = fromWei(web3!, earned);

  const innerOnClose = () => {
    onClose();
  };


  return (
    <Dialog
      initialFocus={buttonRef}
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
          <Button
            type="icon"
            className="absolute right-5 top-5"
            onClick={innerOnClose}
          >
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
          <div className="my-10 text-center">
            <h5 className="text-xl">You are claiming {numberFormat(Number(earnedFromWei))} Hao</h5>
          </div>

          <div>
            <Button type="primary" className="w-full" onClick={onClaiming}>
              Claim Hao now
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
