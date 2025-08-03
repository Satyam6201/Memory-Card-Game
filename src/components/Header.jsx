import React from "react";
import "../style/Header.css";

export default function Header({
  playerName,
  time,
  moves,
  score,
  bestMoves,
  highScore,
  toggleTheme,
  isDark,
}) {
  return (
    <header className="header">
      <div className="top-bar">
        <h1 className="game-title">🧠💡 Memory Master</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="player-info">
        👤 Player: <span className="highlight">{playerName || "Guest"}</span>
      </div>

      <div className="stats-container">
        <div className="stat-box glow-box">
          <p>⏳ Time</p>
          <span>{time}s</span>
        </div>
        <div className="stat-box glow-box">
          <p>🎯 Moves</p>
          <span>{moves}</span>
        </div>
        <div className="stat-box glow-box">
          <p>🥇 Best Time</p>
          <span>{highScore}s</span>
        </div>
        <div className="stat-box glow-box">
          <p>📉 Best Moves</p>
          <span>{bestMoves}</span>
        </div>
        <div className="stat-box glow-box">
          <p>🚀 Score</p>
          <span>{score}</span>
        </div>
      </div>
    </header>
  );
}
