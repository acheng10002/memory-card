/* child component of parent CardSpread component 
for page title and game direction */
function LeftSideHeader() {
  return (
    <div>
      <h1>Pokemon Memory Game</h1>
      <p className="direction">
        Get points by clicking on an image, but don't click on any more than
        once!
      </p>
    </div>
  );
}

export default LeftSideHeader;
