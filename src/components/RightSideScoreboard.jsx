/* child component of parent CardSpread component, with score and bestScore props 
score and bestScore are state variables in CardSpread */
function RightSideScoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
    </div>
  );
}

export default RightSideScoreboard;
