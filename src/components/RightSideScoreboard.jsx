/* child component of parent CardSpread component, with score and bestScore props 
for score and bestScore, which are state variables in CardSpread */
function RightSideScoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
    </div>
  );
}

export default RightSideScoreboard;
