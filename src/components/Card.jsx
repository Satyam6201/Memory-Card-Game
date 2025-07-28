import React from "react";
import "../styles.css";

export default function Card({ card, onClick }) {
  return (
    <div
      className={`card ${card.flipped ? "flipped" : ""} ${
        card.matched ? "matched" : ""
      }`}
      onClick={onClick}
    >
      <div className="front">{card.emoji}</div>
      <div className="back">❓</div>
    </div>
  );
}
