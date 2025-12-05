import React from "react";
import DesignEditor from "./DesignEditor";
import DesignList from "./DesignList";
import Background3D from "./Background3D";

const DesignConsole: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      <Background3D />

      <div className="relative z-10 min-h-screen backdrop-blur-sm bg-black/30 py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-linear-to-r from-pink-300 via-purple-300 to-indigo-400 drop-shadow-lg">
              Tailwind Shikho
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-200 mx-auto font-light">
              Craft stunning UI components in a 3D-enhanced environment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-1 border border-white/20 shadow-2xl">
              <DesignEditor />
            </div>
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-1 border border-white/20 shadow-2xl">
              <DesignList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignConsole;
