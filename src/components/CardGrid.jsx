import React from "react";
import Card from "./Card";
import "../styles.css";

export default function CardGrid({ cards, handleCardClick }) {
  return (
    <div className="card-grid">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
}
