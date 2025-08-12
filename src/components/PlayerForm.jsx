import React, { useState } from "react";
import "../style/playerForm.css";

export default function PlayerForm({ playerName, setPlayerName }) {
  const [focus, setFocus] = useState(false);
  const maxLength = 15;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setPlayerName(value);
    }
  };

  return (
    <div className={`player-form ${focus ? "focused" : ""}`}>
      <label htmlFor="playerName">🎮 Choose Your Avatar Name:</label>
      <input
        id="playerName"
        type="text"
        value={playerName}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={handleChange}
        placeholder="e.g., LightningFox ⚡"
        autoComplete="off"
      />

      <div className="form-footer">
        <span
          className={`char-count ${
            playerName.length >= maxLength - 2 ? "warn" : ""
          }`}
        >
          {playerName.length}/{maxLength}
        </span>
        {playerName && (
          <p className="greeting">👋 Ready, <strong>{playerName}</strong>?</p>
        )}
      </div>
    </div>
  );
}
