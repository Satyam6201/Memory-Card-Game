import React from "react";
import "../styles.css";

export default function Card({ card, onClick }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick();
    }
  };

  return (
    <div
      className={`card ${card.flipped ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
      onClick={onClick}
      tabIndex="0"
      role="button"
      aria-pressed={card.flipped}
      onKeyDown={handleKeyDown}
      title={card.matched ? "Matched!" : "Flip the card"}
    >
      <div className="front" aria-hidden={!card.flipped}>{card.emoji}</div>
      <div className="back" aria-hidden={card.flipped}>❓</div>
    </div>
  );
}
