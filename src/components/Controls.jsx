import React from "react";
import "../styles/Controls.css";

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
  timeElapsed
}) {
  return (
    <div className="controls">
      <div className="stats">
        <span className="stat">⏱️ Time: {timeElapsed}s</span>
        <span className="stat">🎯 Moves: {moves}</span>
      </div>

      <div className="buttons">
        <button className="control-btn" onClick={revealCards}>Hint 🔍</button>
        <button className="control-btn" onClick={resetGame}>Reset ♻️</button>
        <button className="control-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <button className="control-btn" onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? "🔇 Mute" : "🔊 Sound"}
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
