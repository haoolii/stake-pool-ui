import "./App.css";
import Pool from "./components/Pool";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="h-full relative">
        <div className="container mx-auto h-full w-full relative z-10">
          <Header />
          <div className="flex justify-center items-center h-full">
            <Pool />
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
