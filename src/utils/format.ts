import { millify } from 'millify';
import Web3 from 'web3';

export const fromWei = (web3: Web3, num: number) => {
  return web3?.utils.fromWei(num.toString(), 'ether');
};

export const toWei = (web3: Web3, num: number) => {
  return web3?.utils.toWei(num.toString(), 'wei');
};

export const numberFormat = (num = 0) => {
  if (num) {
    return millify(num, { precision: 3 })
  } else {
    return 0;
  }
}