import React from "react";
import "../style/card.css";

export default function Card({ card, onClick }) {
  return (
    <div
      className={`card ${card.flipped ? "flipped" : ""}`}
      onClick={onClick}
      role="button"
      aria-label={card.flipped ? card.name : "Hidden card"}
    >
      <div className="card-inner">
        {/* Front of the card */}
        <div className="card-front">
          <img src={card.image} alt={card.name} />
        </div>

        {/* Back of the card */}
        <div className="card-back">
          <span>❓</span>
        </div>
      </div>
    </div>
  );
}
