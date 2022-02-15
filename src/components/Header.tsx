import React from 'react'

export default function Header() {
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
                <button className="leading-5 text-sm rounded-lg text-slate-600 font-bold hover:bg-slate-200 py-2 px-4">
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
    )
}
