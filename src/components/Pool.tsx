import React from "react";

export default function Pool() {
  return (
    <div className="bg-slate-200/40  backdrop-blur rounded-2xl h-[478px] w-[468px] p-8 space-y-4 flex flex-col">
      <div className="flex justify-between border-b border-slate-500 pb-4">
        <div className="flex flex-1  flex-col">
          <div className="text-xs font-bold tracking-wider">TOTAL STAKED</div>
          <div className="text-xs font-medium">87,524,901 Hao</div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="text-xs font-bold tracking-wider">DAILY REWARD</div>
          <div className="text-xs font-medium">24,169.18 Hao / Day</div>
        </div>
        <div className="flex ml-10 items-end flex-col">
          <div className="text-xs font-bold tracking-wider">APR</div>
          <div className="text-xs font-medium">24%</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-xs font-bold tracking-wider">
            AVAILABLE IN WALLET
          </div>
          <div className="text-2xl font-medium">
            110,000
            <span className="text-sm font-medium ml-2">Hao</span>
          </div>
        </div>

        <div>
          <div className="text-xs font-bold tracking-wider">TOTAL STAKED</div>
          <div className="text-2xl font-medium">
            110,000
            <span className="text-sm font-medium ml-2">Hao</span>
          </div>
        </div>
      </div>

      <div className="flex-1"></div>

      <div className="bg-slate-400 rounded-md px-4 py-3 flex justify-between items-center">
        <div>
          <div className="font-bold text-white tracking-wider">
            CLAIMABLE REWARDS
          </div>
          <div className="text-xl font-medium text-white">
            120
            <span className="text-sm ml-2">Hao</span>
          </div>
        </div>
        <button className="bg-slate-500 py-2 px-4 text-white rounded-md">
          Claim
        </button>
      </div>

      <div className="flex flex-col space-y-4">
        <button className="py-3 bg-slate-400 rounded-md text-white">
          Stake
        </button>
        <button className="py-3 bg-slate-400 rounded-md text-white">
          UnStake
        </button>
      </div>
    </div>
  );
}
