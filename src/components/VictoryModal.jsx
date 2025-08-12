import React from "react";
import "../style/victoryModal.css";

export default function VictoryModal({ playerName, resetGame }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content bounce-in">
        <h2>🎉 Congratulations, {playerName || "Player"}! 🎉</h2>
        <p>You completed the game successfully!</p>
        <button className="play-again-btn" onClick={resetGame}>
          🔁 Play Again
        </button>
      </div>
    </div>
  );
}
