import { useEffect, useState } from "react";
import Card from "./Card";
import { createCards } from "./data";
import "./index.css";

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    setCards(createCards());
    setFlipped([]);
    setMoves(0);
    setWon(false);
  };

  const handleClick = (index) => {
    if (flipped.length === 2) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;

      if (newCards[a].emoji === newCards[b].emoji) {
        newCards[a].isMatched = true;
        newCards[b].isMatched = true;
        setCards(newCards);
        setFlipped([]);

        if (newCards.every((c) => c.isMatched)) {
          setWon(true);
        }
      } else {
        setTimeout(() => {
          newCards[a].isFlipped = false;
          newCards[b].isFlipped = false;
          setCards([...newCards]);
          setFlipped([]);
        }, 800);
      }
    }
  };

  return (
    <div className="app">
      <h1>🧠 Memory Game</h1>
      <p>Moves: {moves}</p>

      <div className="grid">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      {won && <h2>🎉 You Won!</h2>}

      <button onClick={startGame}>Restart</button>
    </div>
  );
}