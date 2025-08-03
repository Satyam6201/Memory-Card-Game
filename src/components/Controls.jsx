import React from "react";
import "../style/Controls.css";

export default function Controls({
  theme,
  toggleTheme,
  emojiSet,
  setEmojiSet,
  resetGame,
  revealCards,
  isMuted,
  setIsMuted,
  difficulty,
  setDifficulty,
  moves,
  timeElapsed,
  isPaused,
  togglePause
}) {
  return (
    <div className="controls">
      <div className="stats">
        <span className="stat glow">⏱️ Time: {timeElapsed}s</span>
        <span className="stat glow">🎯 Moves: {moves}</span>
      </div>

      <div className="buttons">
        <button className="control-btn" onClick={revealCards}>🔍 Hint</button>
        <button className="control-btn" onClick={resetGame}>♻️ Reset</button>
        <button className="control-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        <button className="control-btn" onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? "🔇 Muted" : "🔊 Sound"}
        </button>
        <button className="control-btn" onClick={togglePause}>
          {isPaused ? "▶️ Resume" : "⏸️ Pause"}
        </button>
      </div>

      <div className="selectors">
        <select
          className="dropdown"
          onChange={(e) => {
            setEmojiSet(e.target.value);
            resetGame();
          }}
          value={emojiSet}
        >
          <option value="animals">🐾 Animals</option>
          <option value="fruits">🍉 Fruits</option>
          <option value="flags">🚩 Flags</option>
        </select>

        <select
          className="dropdown"
          onChange={(e) => {
            setDifficulty(e.target.value);
            resetGame();
          }}
          value={difficulty}
        >
          <option value="easy">🟢 Easy</option>
          <option value="medium">🟠 Medium</option>
          <option value="hard">🔴 Hard</option>
        </select>
      </div>
    </div>
  );
}
