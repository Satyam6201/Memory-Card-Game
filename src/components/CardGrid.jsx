import React from "react";
import Card from "./Card";
import "../styles.css";

export default function CardGrid({ cards, onCardClick }) {
  return (
    <div className="grid">
      {cards.map((card, index) => (
        <Card key={card.id} card={card} onClick={() => onCardClick(index)} />
      ))}
    </div>
  );
}
