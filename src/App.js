import React from "react";
import "./App.css";
import GridLights from "./GridLights.js";

function Hero() {
  return (
    <div className="py-6 text-center shadow-lg w-full text-xl font-semibold">
      <h2>Grid Lights</h2>
    </div>
  );
}

function App() {
  return (
    <div className="App flex flex-col justify-center items-center p-0 m-0">
      <Hero></Hero>
      <GridLights></GridLights>
    </div>
  );
}

export default App;
