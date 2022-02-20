import "./App.css";
import Header from "./components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import { initWeb3 } from "./redux/web3/web3.action.creators";
import Stake from "./page/Stake";
import { Home } from "./page/Home";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initWeb3());
  }, []);
  
  return (
    <>
      <div className="h-full relative">
        <div className="container mx-auto h-full w-full relative z-10">
          <Header />
          <div className="flex justify-center items-center h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="stake" element={<Stake />} />
            </Routes>
          </div>
        </div>
        
        <div className="absolute w-full h-full top-0 left-0 z-0 flex items-center justify-center">
          <div className="relative container mx-auto">
            <div className="w-96 h-96 -top-14 right-20 absolute bg-purple-300 rounded-full mix-blend-multiply blur-3xl filter opacity-70 transform animate-blob"></div>
            <div className="w-96 h-96 -top-44 right-48 absolute bg-yellow-300 rounded-full mix-blend-multiply blur-3xl filter opacity-70 animate-blob animation-delay-2000"></div>
            <div className="w-96 h-96 -top-2 right-64 absolute bg-pink-300 rounded-full mix-blend-multiply blur-3xl filter opacity-70 transform animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
