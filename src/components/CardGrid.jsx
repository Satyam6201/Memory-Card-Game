import React, { useEffect, useState } from "react";
import Card from "./Card";
import "../style/cardGrid.css";

export default function CardGrid({ cards, handleCardClick }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`card-grid ${loaded ? "show" : ""}`}
      role="grid"
      aria-label="Memory Game Grid"
    >
      {cards.map((card, index) => (
        <div
          role="gridcell"
          key={index}
          className="grid-cell"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <Card card={card} onClick={() => handleCardClick(index)} />
        </div>
      ))}
    </div>
  );
}
