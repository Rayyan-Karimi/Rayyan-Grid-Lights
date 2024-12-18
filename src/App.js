import { useState } from "react";
import "./App.css";

function Hero() {
  return (
    <div className="py-6 text-center shadow-lg w-full text-xl font-semibold">
      <h2>Guess The Number</h2>
    </div>
  );
}

function Main() {
  const [gridSize, setGridSize] = useState(3);
  const generateGrid = () => {
    const boxes = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      boxes.push(<div key={i} className="box bg-orange-400"></div>);
    }
    return boxes;
  };
  return (
    <div className="container w-full h-full min-h-screen">
      <div className="wrapper h-full min-h-screen m-4 flex flex-col items-center">
        <p className="header m-3">
          Click on cells to select them. Once all cells are selected, they will
          be unselected one by one in the reverse order they were selected.
        </p>
        {/** Dynamic grid */}
        <div
          className="grid max-w-lg gap-4 aspect-square"
          style={{ gridTemplateColumns: `repeat(${gridSize}), 1fr` }}
        >
          {generateGrid}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App flex flex-col justify-center items-center p-0 m-0">
      <Hero></Hero>
      <Main></Main>
    </div>
  );
}

export default App;
