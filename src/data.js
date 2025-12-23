const emojis = ["🐶", "🐱", "🦊", "🐼", "🐸", "🐵"];

export const createCards = () =>
  [...emojis, ...emojis]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    }));
