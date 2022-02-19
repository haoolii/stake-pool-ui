import React from "react";
import { useSelector } from "react-redux";
import { RooState } from "../redux/combile";
import { State } from "../redux/web3/web3.reducer";

export default function Header() {
  const { web3, loading, error, account } = useSelector<RooState, State>(
    (state) => state.web3
  );

  const accountEllipsis = `${account?.slice(0, 6)}...${account
    ?.split("")
    .reverse()
    .join("")
    .slice(0, 4)}`;

  return (
    <div className="fixed top-0 container mx-auto">
      <div className="w-full flex justify-between">
        <div className="flex space-x-4 py-4">
          <div>
            <button className="leading-5 text-sm rounded-lg text-slate-600 font-bold hover:bg-slate-200 py-2 px-4">
              Logo
            </button>
          </div>
          <div>
            <button className="leading-5 text-sm rounded-lg text-slate-600 font-bold hover:bg-slate-200 py-2 px-4">
              Stake
            </button>
          </div>
          <div>
            <button className="leading-5 text-sm rounded-lg text-slate-600 font-bold hover:bg-slate-200 py-2 px-4">
              Docs
            </button>
          </div>
        </div>
        <div className="flex py-4">
          {account ? (
            <button className="w-36 text-ellipsis overflow-hidden leading-5 text-sm rounded-lg text-slate-600 font-bold hover:bg-slate-200 py-2 px-4">
              {accountEllipsis}
            </button>
          ) : (
            <button className="w-36 leading-5 text-sm rounded-lg text-slate-600 font-bold hover:bg-slate-200 py-2 px-4">
              {loading ? "Loading" : error ? error : "Connect Wallet"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
