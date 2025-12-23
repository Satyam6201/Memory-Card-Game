import { useEffect, useState } from "react";
import Card from "./Card";
import { createCards } from "./data";
import "./index.css";

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [lockBoard, setLockBoard] = useState(false);
  const [bestTime, setBestTime] = useState(
    localStorage.getItem("bestTime") || null
  );

  useEffect(() => startGame(), []);

  useEffect(() => {
    if (!timerOn) return;
    const interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [timerOn]);

  const startGame = () => {
    setCards(createCards());
    setFlipped([]);
    setMoves(0);
    setTime(0);
    setWon(false);
    setTimerOn(true);
    setLockBoard(false);
  };

  const handleClick = (index) => {
    if (lockBoard) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLockBoard(true);
      setMoves(m => m + 1);

      const [a, b] = newFlipped;

      if (newCards[a].emoji === newCards[b].emoji) {
        newCards[a].isMatched = true;
        newCards[b].isMatched = true;
        setCards(newCards);
        setFlipped([]);
        setLockBoard(false);

        if (newCards.every(c => c.isMatched)) {
          setWon(true);
          setTimerOn(false);

          if (!bestTime || time < bestTime) {
            localStorage.setItem("bestTime", time);
            setBestTime(time);
          }
        }
      } else {
        setTimeout(() => {
          newCards[a].isFlipped = false;
          newCards[b].isFlipped = false;
          setCards([...newCards]);
          setFlipped([]);
          setLockBoard(false);
        }, 900);
      }
    }
  };

  const showHint = () => {
    setLockBoard(true);
    setCards(cards.map(c => ({ ...c, isFlipped: true })));

    setTimeout(() => {
      setCards(cards.map(c =>
        c.isMatched ? c : { ...c, isFlipped: false }
      ));
      setLockBoard(false);
    }, 1200);
  };

  return (
    <div className="app">
      <h1>🧠 Memory Game</h1>

      <div className="stats">
        <p>⏱ Time: {time}s</p>
        <p>🎯 Moves: {moves}</p>
        {bestTime && <p>🏆 Best: {bestTime}s</p>}
      </div>

      <div className="controls">
        <button onClick={showHint}>🔍 Hint</button>
        <button onClick={startGame}>♻ Restart</button>
      </div>

      <div className="grid">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            disabled={lockBoard}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      {won && <h2 className="win">🎉 You Won!</h2>}
    </div>
  );
}
