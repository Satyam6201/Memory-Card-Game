import React, { useState } from "react";
import "../styles/playerForm.css";

export default function PlayerForm({ playerName, setPlayerName }) {
  const [focus, setFocus] = useState(false);

  return (
    <div className={`player-form ${focus ? "focused" : ""}`}>
      <label htmlFor="playerName">🎮 Enter Player Name:</label>
      <input
        id="playerName"
        type="text"
        value={playerName}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="e.g., Satyam"
        maxLength={15}
        autoComplete="off"
      />
      {playerName && <p className="greeting">👋 Hello, {playerName}!</p>}
    </div>
  );
}
