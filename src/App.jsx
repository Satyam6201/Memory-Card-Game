import React, { useState, useEffect } from "react";
import CardGrid from "./components/CardGrid";
import Header from "./components/Header";
import Controls from "./components/Controls";
import PlayerForm from "./components/PlayerForm";
import VictoryModal from "./components/VictoryModal";
import "./styles.css";
import confetti from "canvas-confetti";

const emojiThemes = {
  animals: ["🐱", "🐶", "🐼", "🦊", "🐵", "🐸", "🐯", "🐷"],
  fruits: ["🍎", "🍌", "🍇", "🍉", "🍍", "🍑", "🥝", "🍓"],
  flags: ["🇮🇳", "🇺🇸", "🇬🇧", "🇯🇵", "🇧🇷", "🇫🇷", "🇨🇦", "🇰🇷"],
};

const difficultyMap = {
  easy: 4,
  medium: 6,
  hard: 8,
};

const generateCards = (theme, difficulty) => {
  const selectedEmojis = emojiThemes[theme].slice(0, difficulty);
  const emojis = [...selectedEmojis, ...selectedEmojis];
  return emojis
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }));
};

export default function App() {
  const [theme, setTheme] = useState("light");
  const [emojiSet, setEmojiSet] = useState("animals");
  const [difficulty, setDifficulty] = useState("easy");
  const [cards, setCards] = useState(generateCards(emojiSet, difficultyMap[difficulty]));
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playerName, setPlayerName] = useState("");

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
    setCards(generateCards(emojiSet, difficultyMap[difficulty]));
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
      <PlayerForm playerName={playerName} setPlayerName={setPlayerName} />
      <Header
        playerName={playerName}
        time={time}
        moves={moves}
        score={score}
        bestMoves={bestMoves}
        highScore={highScore}
      />
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
      {gameWon && <VictoryModal playerName={playerName} resetGame={resetGame} />}
    </div>
  );
}
