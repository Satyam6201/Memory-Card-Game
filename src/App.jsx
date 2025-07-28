import React, { useState, useEffect } from "react";
import CardGrid from "./components/CardGrid";
import "./styles.css";
import confetti from "canvas-confetti";

const emojiThemes = {
  animals: ["🐱", "🐶", "🐼", "🦊", "🐵", "🐸", "🐯", "🐷"],
  fruits: ["🍎", "🍌", "🍇", "🍉", "🍍", "🍑", "🥝", "🍓"],
  flags: ["🇮🇳", "🇺🇸", "🇬🇧", "🇯🇵", "🇧🇷", "🇫🇷", "🇨🇦", "🇰🇷"],
};

const generateCards = (theme) => {
  const emojis = [...emojiThemes[theme], ...emojiThemes[theme]];
  return emojis
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false
    }));
};

export default function App() {
  const [theme, setTheme] = useState("light");
  const [emojiSet, setEmojiSet] = useState("animals");
  const [cards, setCards] = useState(generateCards(emojiSet));
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [highScore, setHighScore] = useState(() =>
    localStorage.getItem("highScore") || 0
  );
  const [bestMoves, setBestMoves] = useState(() =>
    localStorage.getItem("bestMoves") || 0
  );

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.emoji === secondCard.emoji) {
        if (!isMuted) new Audio("/match.mp3").play();
        setScore((prev) => prev + 10);
        setCards((prev) =>
          prev.map((card, idx) =>
            idx === first || idx === second
              ? { ...card, matched: true }
              : card
          )
        );
      } else {
        if (!isMuted) new Audio("/flip.mp3").play();
      }

      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, idx) =>
            idx === first || idx === second
              ? { ...card, flipped: false }
              : card
          )
        );
        setSelectedCards([]);
      }, 800);
    }
  }, [selectedCards, cards, isMuted]);

  useEffect(() => {
    if (cards.every((card) => card.matched)) {
      setGameWon(true);
      confetti();

      if (time < highScore || highScore === 0) {
        setHighScore(time);
        localStorage.setItem("highScore", time);
      }

      if (moves < bestMoves || bestMoves === 0) {
        setBestMoves(moves);
        localStorage.setItem("bestMoves", moves);
      }
    }
  }, [cards, time, highScore, moves, bestMoves]);

  useEffect(() => {
    let timer;
    if (!gameWon) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [time, gameWon]);

  const handleCardClick = (index) => {
    if (!cards[index].flipped && selectedCards.length < 2) {
      if (!isMuted) new Audio("/flip.mp3").play();
      setMoves((prev) => prev + 1);
      setCards((prev) =>
        prev.map((card, idx) =>
          idx === index ? { ...card, flipped: true } : card
        )
      );
      setSelectedCards((prev) => [...prev, index]);
    }
  };

  const resetGame = () => {
    setCards(generateCards(emojiSet));
    setSelectedCards([]);
    setScore(0);
    setMoves(0);
    setTime(0);
    setGameWon(false);
  };

  const revealCards = () => {
    setCards((prev) => prev.map((card) => ({ ...card, flipped: true })));
    setTimeout(() => {
      setCards((prev) =>
        prev.map((card) =>
          !card.matched ? { ...card, flipped: false } : card
        )
      );
    }, 1000);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app ${theme}`}>
      <h1>🧠 Memory Card Game</h1>

      <div className="stats">
        <p>⏳ Time: {time}s</p>
        <p>🎯 Moves: {moves}</p>
        <p>🏆 Best Time: {highScore}s</p>
        <p>🔢 Best Moves: {bestMoves}</p>
      </div>

      <h2>Score: {score}</h2>

      <div className="buttons">
        <button onClick={revealCards}>Hint 🔍</button>
        <button onClick={resetGame}>Reset Game</button>
        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        <button onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? "🔇 Mute" : "🔊 Sound"}
        </button>
        <select
          onChange={(e) => {
            setEmojiSet(e.target.value);
            resetGame();
          }}
          value={emojiSet}
        >
          <option value="animals">🐾 Animals</option>
          <option value="fruits">🍉 Fruits</option>
          <option value="flags">🚩 Flags</option>
        </select>
      </div>

      <CardGrid cards={cards} onCardClick={handleCardClick} />

      {gameWon && (
        <>
          <p className="winning-message">🎉 Congratulations! You won! 🎉</p>
          <button onClick={resetGame}>🔁 Play Again</button>
        </>
      )}
    </div>
  );
}
