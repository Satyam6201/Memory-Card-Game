import React, { useState, useEffect } from "react";
import CardGrid from "./components/CardGrid";
import Controls from "./components/Controls";
import Header from "./components/Header";
import PlayerForm from "./components/PlayerForm";
import VictoryModal from "./components/VictoryModal";
import "./styles.css";

const emojiSets = {
  animals: ["🐱", "🐶", "🐼", "🦊", "🐵", "🐸", "🐯", "🐷"],
  fruits: ["🍎", "🍌", "🍇", "🍉", "🍓", "🍍", "🥝", "🍒"],
  flags: ["🇮🇳", "🇺🇸", "🇯🇵", "🇫🇷", "🇩🇪", "🇧🇷", "🇨🇳", "🇬🇧"],
  sports: ["⚽", "🏀", "🏈", "🎾", "🏐", "🏏", "🥊", "🏓"],
  nature: ["🌲", "🌸", "🌞", "🌧️", "🌈", "🌻", "🌊", "🌍"],
  tech: ["💻", "📱", "🖥️", "🖱️", "⌨️", "📡", "🔌", "🤖"]
};

const difficulties = {
  easy: 4,
  medium: 6,
  hard: 8,
};

export default function App() {
  const [theme, setTheme] = useState("light");
  const [emojiSet, setEmojiSet] = useState("animals");
  const [difficulty, setDifficulty] = useState("easy");
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [time, setTime] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );
  const [bestMoves, setBestMoves] = useState(
    parseInt(localStorage.getItem("bestMoves")) || Infinity
  );

  // Theme Effect
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Timer
  useEffect(() => {
    let interval;
    if (startTime && matched.length !== cards.length) {
      interval = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [startTime, matched, cards]);

  // Win Check
  useEffect(() => {
    if (cards.length && matched.length === cards.length) {
      setShowModal(true);
      if (time < highScore || !highScore) {
        localStorage.setItem("highScore", time);
        setHighScore(time);
      }
      if (moves < bestMoves) {
        localStorage.setItem("bestMoves", moves);
        setBestMoves(moves);
      }
    }
  }, [matched, cards, time, highScore, moves, bestMoves]);

  const generateCards = () => {
    const emojiArray = emojiSets[emojiSet];
    const total = difficulties[difficulty];
    let selected = emojiArray.slice(0, total);
    const fullSet = [...selected, ...selected].sort(() => Math.random() - 0.5);
    return fullSet.map((emoji) => ({ emoji, isFlipped: false }));
  };

  const resetGame = () => {
    setCards(generateCards());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setScore(0);
    setStartTime(Date.now());
    setTime(0);
    setShowModal(false);
  };

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const revealCards = () => {
    const revealed = cards.map((card) => ({ ...card, isFlipped: true }));
    setCards(revealed);
    setTimeout(() => {
      const hidden = revealed.map((card, index) =>
        matched.includes(index)
          ? card
          : { ...card, isFlipped: false }
      );
      setCards(hidden);
    }, 1500);
  };

  const handleCardClick = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;

    const newFlipped = [...flipped, index];
    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched((prev) => [...prev, first, second]);
        setScore((prev) => prev + 10);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, i) =>
              newFlipped.includes(i)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlipped([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    resetGame();
  }, [emojiSet, difficulty]);

  return (
    <div className={`app-container ${theme} ${showModal ? "fireworks" : ""}`}>
      <Header
        playerName={playerName}
        time={time}
        moves={moves}
        score={score}
        bestMoves={bestMoves}
        highScore={highScore}
      />
      <PlayerForm playerName={playerName} setPlayerName={setPlayerName} />
      <Controls
        theme={theme}
        toggleTheme={toggleTheme}
        emojiSet={emojiSet}
        setEmojiSet={setEmojiSet}
        resetGame={resetGame}
        revealCards={revealCards}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <CardGrid cards={cards} handleCardClick={handleCardClick} />
      {showModal && (
        <VictoryModal playerName={playerName} resetGame={resetGame} />
      )}

      <footer className="footer">
        <p className="credit">Made with ❤️ by <span className="name-glow">Satyam</span></p>
      </footer>
    </div>
  );
}
