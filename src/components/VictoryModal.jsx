import React from "react";

export default function VictoryModal({ playerName, resetGame }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>🎉 Congratulations, {playerName || "Player"}! 🎉</h2>
        <p>You completed the game!</p>
        <button onClick={resetGame}>🔁 Play Again</button>
      </div>
    </div>
  );
}
