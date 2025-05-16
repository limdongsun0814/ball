import "./App.css";
import { useState } from "react";
import Ball from "./components/Ball";

function App() {
  const [balls, setBalls] = useState([]);
  alert("클릭하면 공이 생성됩니다!");

  const handleClick = (e) => {
    const newBall = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setBalls((prev) => [...prev, newBall]);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: "100vw",
        height: "100vh",
        // backgroundColor: "#f0f0f0",
        // position: "relative",
        overflow: "hidden",
      }}
    >
      {balls.map((ball) => (
        <Ball key={ball.id} id={ball.id} x={ball.x} y={ball.y} />
      ))}
    </div>
  );
}

export default App;
