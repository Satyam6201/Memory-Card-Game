import React from "react";

export default function PlayerForm({ playerName, setPlayerName }) {
  return (
    <div className="player-form">
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter your name..."
      />
    </div>
  );
}
