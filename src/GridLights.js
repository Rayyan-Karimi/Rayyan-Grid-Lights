import React, { useEffect, useState } from "react";

function GridLights() {
  const [gridSize] = useState(3); // Default size is 3x3
  const [clicked, setClicked] = useState(
    Array(gridSize * gridSize).fill(false)
  );
  const [clickOrder, setClickOrder] = useState([]);

  useEffect(() => {
    if(clicked.every((box) => box)) { 
      console.log("all clicked:", clicked, "Retracting.")
      retractBoxes();
    }
  }, [clicked]);

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
    let currentIndex = clickOrder.length - 1;
    console.log("Click order was:", clickOrder);

    const interval = setInterval(() => {
      if (currentIndex < 0) {
        setClickOrder([]);
        clearInterval(interval);
        return;
      }
      // change clicked
      setClicked((oldClicked) => {
        const newClicked = [...oldClicked];
        newClicked[clickOrder[currentIndex]] = false;
        console.log(
          `Retracting box at index ${clickOrder[currentIndex]}`,
          "New clicked state:",
          newClicked
        );
        return newClicked;
      });

      currentIndex--;
    }, 500);
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
              : "bg-slate-100"
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
    </div>
  );
}

export default GridLights;
