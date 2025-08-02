import React from "react";
import "../style/card.css";

export default function Card({ card, onClick }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick();
    }
  };

  return (
    <div
      className={`card ${card.flipped ? "flipped" : ""} ${card.matched ? "matched" : ""} ${card.selected ? "selected" : ""}`}
      onClick={onClick}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={card.flipped ? card.emoji : "Hidden card"}
      aria-pressed={card.flipped}
    >
      <span className="ripple" />
      <div className="card-inner">
        <div className="card-front">{card.emoji}</div>
        <div className="card-back">❓</div>
      </div>
    </div>
  );
}
