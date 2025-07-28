import React, { useState, useEffect } from "react";
import CardGrid from "./components/CardGrid";
import "./styles.css";

const emojiThemes = {
  animals: ["🐱", "🐶", "🐼", "🦊", "🐵", "🐸", "🐯", "🐷"],
  food: ["🍕", "🍔", "🍟", "🌮", "🍣", "🍩", "🥞", "🍗"],
  halloween: ["🎃", "👻", "🧛‍♂️", "🕸️", "🦇", "🧙‍♀️", "🧟‍♂️", "💀"]
};

export default function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [themeSet, setThemeSet] = useState("animals");
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [flips, setFlips] = useState(0);
  const [time, setTime] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setCards(generateCards());
  }, [difficulty, themeSet]);

  const getGridSize = () => {
    switch (difficulty) {
      case "medium": return 18;
      case "hard": return 32;
      default: return 8;
    }
  };

  const generateCards = () => {
    const selected = emojiThemes[themeSet].slice(0, getGridSize() / 2);
    return [...selected, ...selected]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false
      }));
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      if (cards[first].emoji === cards[second].emoji) {
        setScore(score + 10);
        playSound("/match.mp3");
        setCards(prev =>
          prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, matched: true } : card
          )
        );
      } else {
        playSound("/flip.mp3");
      }
      setTimeout(() => {
        setCards(prev =>
          prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, flipped: false } : card
          )
        );
        setSelectedCards([]);
        setFlips(flips + 1);
      }, 800);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameWon(true);
      const scores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
      const newEntry = { time, score, difficulty };
      const updated = [...scores, newEntry].sort((a, b) => a.time - b.time).slice(0, 3);
      localStorage.setItem("leaderboard", JSON.stringify(updated));
    }
  }, [cards]);

  useEffect(() => {
    let timer;
    if (!gameWon) {
      timer = setInterval(() => setTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameWon]);

  const playSound = (file) => {
    if (soundOn) new Audio(file).play();
  };

  const handleCardClick = (index) => {
    if (!cards[index].flipped && selectedCards.length < 2) {
      playSound("/flip.mp3");
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
    setFlips(0);
    setGameWon(false);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app ${theme}`}>
      <h1>🧠 Memory Card Game</h1>
      <div className="controls">
        <select onChange={(e) => setThemeSet(e.target.value)} value={themeSet}>
          {Object.keys(emojiThemes).map(set => (
            <option key={set} value={set}>{set}</option>
          ))}
        </select>
        <select onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="stats">
        <p>⏳ Time: {time}s</p>
        <p>🏅 Flips: {flips}</p>
        <p>💯 Score: {score}</p>
      </div>
      <div className="buttons">
        <button onClick={revealCards}>Hint 🔍</button>
        <button onClick={resetGame}>Reset Game</button>
        <button onClick={toggleTheme}>{theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}</button>
        <button onClick={() => setSoundOn(!soundOn)}>{soundOn ? "🔊 Sound On" : "🔇 Sound Off"}</button>
      </div>
      <CardGrid cards={cards} onCardClick={handleCardClick} />
      {gameWon && <p className="winning-message">🎉 Congratulations! You won! 🎉</p>}
      <div className="leaderboard">
        <h3>🏆 Leaderboard</h3>
        <ul>
          {(JSON.parse(localStorage.getItem("leaderboard") || "[]")).map((entry, i) => (
            <li key={i}>{i + 1}. ⏱ {entry.time}s | 💯 {entry.score} | 🎮 {entry.difficulty}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
