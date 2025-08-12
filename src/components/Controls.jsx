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
      {/* Stats Section */}
      <div className="stats">
        <span className="stat glow">⏱️ Time: {timeElapsed}s</span>
        <span className="stat glow">🎯 Moves: {moves}</span>
      </div>

      {/* Buttons */}
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

      {/* Dropdown Selectors */}
      <div className="selectors">
        <select
          className="dropdown fade-in"
          onChange={(e) => {
            setEmojiSet(e.target.value);
            resetGame();
          }}
          value={emojiSet}
        >
          <option value="animals">🐾 Animals</option>
          <option value="fruits">🍉 Fruits</option>
          <option value="flags">🚩 Flags</option>
          <option value="sports">🏆 Sports</option>
          <option value="nature">🌿 Nature</option>
          <option value="tech">💻 Tech</option>
        </select>

        <select
          className="dropdown fade-in"
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
