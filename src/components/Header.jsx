import React from "react";

export default function Header({ playerName, time, moves, score, bestMoves, highScore }) {
  return (
    <header className="header">
      <h1>🧠 Memory Card Game</h1>
      <p>👤 Player: {playerName || "Guest"}</p>
      <div className="stats">
        <p>⏳ Time: {time}s</p>
        <p>🎯 Moves: {moves}</p>
        <p>🏆 Best Time: {highScore}s</p>
        <p>🔢 Best Moves: {bestMoves}</p>
        <p>⭐ Score: {score}</p>
      </div>
    </header>
  );
}
