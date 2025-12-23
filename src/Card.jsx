export default function Card({ card, onClick, disabled }) {
  return (
    <div
      className={`card 
        ${card.isFlipped || card.isMatched ? "flipped" : ""} 
        ${card.isMatched ? "matched" : ""}`}
      onClick={!disabled ? onClick : null}
    >
      <div className="card-inner">
        <div className="card-front">{card.emoji}</div>
        <div className="card-back">❓</div>
      </div>
    </div>
  );
}
