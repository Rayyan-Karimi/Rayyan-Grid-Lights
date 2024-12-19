import React from "react";

function Popup({
  gridSize,
  setGridSize,
  delay,
  setDelay,
  clicked,
  setClicked,
  clickOrder,
  setClickOrder,
}) {
  return (
    <div className="fixed top-4 right-4 z-50 text-white bg-black rounded-2xl shadow-lg m-2 w-56">
      <div className="mb-2 bg-slate-700 text-sm py-2 rounded-t-2xl">Config</div>
      <div className="m-4 flex gap-2 flex-col justify-between">
        <div className="flex justify-between">
          <label className="text-sm">gridSize</label>
          <input
            type="range"
            min="2"
            max="4"
            value={gridSize}
            className="w-1/2 rounded-md text-center text-black"
            onChange={(e) => {
              const newSize = e.target.value;
              setGridSize(Number(newSize));
              setClicked(Array(newSize * newSize).fill(false));
              setClickOrder([]);
            }}
          />
          <span className="text-sm">{gridSize}</span>
        </div>
        <div className="flex justify-between">
          <label className="text-sm">delay</label>
          <input
            type="range"
            min="100"
            max="1000"
            value={delay}
            className="w-1/2 rounded-md text-center text-black"
            onChange={(e) => setDelay(Number(e.target.value))}
          />
          <span className="text-sm">{delay}ms</span>
        </div>
      </div>
    </div>
  );
}

export default Popup;
