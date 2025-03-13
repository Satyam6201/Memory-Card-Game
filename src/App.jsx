import React, { useState, useEffect } from "react";
import CardGrid from "./components/CardGrid";
import "./styles.css";

const images = ["🐱", "🐶", "🐼", "🦊", "🐵", "🐸", "🐯", "🐷"];

const generateCards = () => {
  let cardArray = [...images, ...images]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false
    }));
  return cardArray;
};

export default function App() {
  const [cards, setCards] = useState(generateCards());
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [highScore, setHighScore] = useState(
    localStorage.getItem("highScore") || 0
  );

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      if (cards[first].emoji === cards[second].emoji) {
        setScore(score + 10);
        new Audio("/match.mp3").play(); // Match Sound
        setCards(prev =>
          prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, matched: true } : card
          )
        );
      } else {
        new Audio("/flip.mp3").play(); // Flip Sound
      }
      setTimeout(() => {
        setCards(prev =>
          prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, flipped: false } : card
          )
        );
        setSelectedCards([]);
      }, 800);
    }
  }, [selectedCards, cards, score]);

  useEffect(() => {
    if (cards.every(card => card.matched)) {
      setGameWon(true);
      if (time < highScore || highScore === 0) {
        setHighScore(time);
        localStorage.setItem("highScore", time);
      }
    }
  }, [cards, time, highScore]);

  useEffect(() => {
    let timer;
    if (!gameWon) {
      timer = setInterval(() => setTime(time + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [time, gameWon]);

  const handleCardClick = (index) => {
    if (!cards[index].flipped && selectedCards.length < 2) {
      new Audio("/flip.mp3").play(); // Flip Sound
      setCards(prev =>
        prev.map((card, idx) =>
          idx === index ? { ...card, flipped: true } : card
        )
      );
      setSelectedCards([...selectedCards, index]);
    }
  };

  const revealCards = () => {
    setCards(prev => prev.map(card => ({ ...card, flipped: true })));
    setTimeout(() => {
      setCards(prev => prev.map(card => (!card.matched ? { ...card, flipped: false } : card)));
    }, 1000);
  };

  const resetGame = () => {
    setCards(generateCards());
    setSelectedCards([]);
    setScore(0);
    setTime(0);
    setGameWon(false);
  };

  return (
    <div className="app">
      <h1>Memory Card Game</h1>
      <div className="stats">
        <p>⏳ Time: {time}s</p>
        <p>🏆 High Score: {highScore}s</p>
      </div>
      <h2>Score: {score}</h2>
      <button onClick={revealCards}>Hint 🔍</button>
      <button onClick={resetGame}>Reset Game</button>
      <CardGrid cards={cards} onCardClick={handleCardClick} />
      {gameWon && <p className="winning-message">🎉 Congratulations! You won! 🎉</p>}
    </div>
  );
}
