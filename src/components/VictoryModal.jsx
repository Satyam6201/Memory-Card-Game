import React from "react";
import "../style/victoryModal.css";

export default function VictoryModal({ playerName, resetGame }) {
  const handleShare = () => {
    const text = `🎉 I just completed the memory game! 🎯 Play now and beat my score!`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Game result copied! Share it with your friends 🚀");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content bounce-in">
        <button className="close-btn" onClick={resetGame}>❌</button>
        <h2>🎉 Congrats, {playerName || "Player"}! 🎉</h2>
        <p>🏁 You’ve mastered the game!</p>
        <div className="btn-group">
          <button className="play-again-btn" onClick={resetGame}>🔁 Play Again</button>
          <button className="share-btn" onClick={handleShare}>📤 Share</button>
        </div>
        <div className="confetti">🎊 🎈 🎉 🥳 🎊 🎈 🎉</div>
      </div>
    </div>
  );
}
