import React, { useEffect, useState } from "react";
import Card from "./Card";
import "../style/cardGrid.css";

export default function CardGrid({ cards, handleCardClick }) {
  const [isShuffled, setIsShuffled] = useState(false);

  useEffect(() => {
    // Trigger animation when cards are first loaded
    const timeout = setTimeout(() => {
      setIsShuffled(true);
    }, 100); // small delay to trigger CSS animation

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`card-grid ${isShuffled ? "show-grid" : ""}`}
      role="grid"
      aria-label="Memory Game Grid"
    >
      {cards.map((card, index) => (
        <div role="gridcell" key={index}>
          <Card card={card} onClick={() => handleCardClick(index)} />
        </div>
      ))}
    </div>
  );
}
