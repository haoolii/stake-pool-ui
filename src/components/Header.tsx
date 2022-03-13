import React from 'react';

import { useSelector } from 'react-redux';
import {
  Link,
  LinkProps,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';

import { RootState } from '../redux/combile';
import { State } from '../redux/reducers/account.reducer';

export default function Header() {
  const { account, loading, error } = useSelector<RootState, State>(
    (state) => state.account
  );

  const accuntDisplay = account
    ? `${account.slice(0, 6)} ... ${account.slice(
        account.length - 4,
        account.length
      )}`
    : null;

  return (
    <div className="fixed top-0 container mx-auto">
      <div className="w-full flex justify-between">
        <div className="flex space-x-4 py-4">
          <CustomLink to="/">Logo</CustomLink>
          <CustomLink to="/stake">Stake</CustomLink>
          <a
            href="https://unnhao.gitbook.io/hao-stake-pool/"
            target="_blank"
            className="leading-5 text-sm rounded-lg text-slate-600 font-bold hover:bg-slate-200 py-2 px-4"
          >
            Docs
          </a>
        </div>
        <div className="flex py-4">
          {accuntDisplay ? (
            <button className="w-36 text-ellipsis overflow-hidden leading-5 text-sm rounded-lg text-slate-600 font-bold hover:bg-slate-200 py-2 px-4">
              {accuntDisplay}
            </button>
          ) : (
            <button className="w-36 leading-5 text-sm rounded-lg text-slate-600 font-bold hover:bg-slate-200 py-2 px-4">
              {loading ? 'Loading' : error ? error : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div className="flex items-center">
      <Link
        className={`leading-5 text-sm rounded-lg text-slate-600 font-bold hover:bg-slate-200 py-2 px-4 ${
          match ? 'bg-slate-200' : ''
        }`}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}
