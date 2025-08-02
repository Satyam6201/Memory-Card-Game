import React from "react";
import "../styles/Header.css";

export default function Header({
  playerName,
  time,
  moves,
  score,
  bestMoves,
  highScore,
}) {
  return (
    <header className="header">
      <h1 className="game-title">🧠 Memory Card Game</h1>
      <div className="player-info">
        <p>👤 Player: <span className="highlight">{playerName || "Guest"}</span></p>
      </div>

      <div className="stats-container">
        <div className="stat-box">
          <p>⏳ Time</p>
          <span>{time}s</span>
        </div>
        <div className="stat-box">
          <p>🎯 Moves</p>
          <span>{moves}</span>
        </div>
        <div className="stat-box">
          <p>🏆 Best Time</p>
          <span>{highScore}s</span>
        </div>
        <div className="stat-box">
          <p>🔢 Best Moves</p>
          <span>{bestMoves}</span>
        </div>
        <div className="stat-box">
          <p>⭐ Score</p>
          <span>{score}</span>
        </div>
      </div>
    </header>
  );
}
