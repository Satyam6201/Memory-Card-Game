import React from "react";
import Card from "./Card";
import "../styles.css";

export default function CardGrid({ cards, onCardClick }) {
  const matchedCount = cards.filter(card => card.matched).length;

  return (
    <div className="grid-container">
      <div className="grid" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(70px, 1fr))` }}>
        {cards.map((card, index) => (
          <Card key={card.id} card={card} onClick={() => onCardClick(index)} />
        ))}
      </div>
      <div className="matched-counter">
        ✅ Matched Cards: {matchedCount} / {cards.length}
      </div>
    </div>
  );
}
