import React, { useState, useEffect } from "react";
import Popup from "./Popup.js";

function GridLights() {
  const [gridSize, setGridSize] = useState(2); // Default size is 3x3
  const [clicked, setClicked] = useState(
    Array(gridSize * gridSize).fill(false)
  );
  const [clickOrder, setClickOrder] = useState([]);
  const [delay, setDelay] = useState(500);

  // Trigger retraction when all boxes are clicked
  useEffect(() => {
    if (clicked.every((box) => box)) {
      console.log("All clicked:", clicked, "Retracting.");
      retractBoxes();
    }
  });

  const handleClick = (index) => {
    if (clicked[index]) {
      return;
    }

    const newClicked = [...clicked];
    newClicked[index] = true;
    setClicked(newClicked);
    setClickOrder([...clickOrder, index]);
  };

  const retractBoxes = () => {
    let currentIndex = clickOrder.length;
    console.log("Click order was:", clickOrder);

    const interval = setInterval(
      () => {
        if (currentIndex < 0) {
          clearInterval(interval); // Stop the interval
          setClickOrder([]); // Clear the click order
          return;
        }

        // Update `clicked` state
        setClicked((prevClicked) => {
          const newClicked = [...prevClicked];
          newClicked[clickOrder[currentIndex]] = false; // Reset box at current index
          console.log(
            `Retracting box at index ${clickOrder[currentIndex]}`,
            "New clicked state:",
            newClicked
          );
          return newClicked;
        });

        currentIndex--; // Move to the next box in reverse order
      },
      delay
      // 500
    ); // Adjust timing as needed
  };

  // Generate grid boxes
  const generateGrid = () => {
    const boxes = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      boxes.push(
        <div
          key={i}
          className={`box ${
            clicked[i]
              ? "bg-green-400 hover:cursor-not-allowed"
              : "bg-slate-100 hover:bg-slate-200"
          } border border-black`}
          onClick={() => handleClick(i)}
        ></div>
      );
    }
    return boxes;
  };

  return (
    <div className="container w-full h-full min-h-screen">
      <div className="wrapper h-full min-h-screen m-4 flex flex-col items-center">
        <p className="header m-3 text-center">
          Click on cells to select them. Once all cells are selected, they will
          be unselected one by one in the reverse order they were selected.
        </p>

        {/* Dynamic grid */}
        <div
          className="grid max-w-lg w-full aspect-square gap-4 border"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {generateGrid()}
        </div>
      </div>
      <Popup
        gridSize={gridSize}
        setGridSize={setGridSize}
        delay={delay}
        setDelay={setDelay}
        clicked={clicked}
        setClicked={setClicked}
        clickOrder={clickOrder}
        setClickOrder={setClickOrder}
      ></Popup>
    </div>
  );
}

export default GridLights;
