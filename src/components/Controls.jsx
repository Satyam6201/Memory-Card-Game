import React from "react";

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
}) {
  return (
    <div className="controls">
      <button onClick={revealCards}>Hint 🔍</button>
      <button onClick={resetGame}>Reset Game</button>
      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
      <button onClick={() => setIsMuted(!isMuted)}>
        {isMuted ? "🔇 Mute" : "🔊 Sound"}
      </button>

      <select
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
  );
}
