import PokemonImage from "./PokemonImage.jsx";

/* parent Card component for child PokemonImage component 
pokemonName is prop for rendering the Pokemon's name and image in the UI
handleClick is event handler
cardKey is a custom prop for event handling/game logic, 
    determining if a card has been clicked */
function Card({ pokemonName, handleClick, cardKey }) {
  return (
    /* onClick={handleClick} - passes a reference to the function, React 
      invokes handleClick when the event is triggered; doesn't create a new
      function, more efficient performance 
      vs. onClick={() => handleClick()} - function call inside an arrow function
      creates an anonymous function that will call handleClick when onClick event 
      is triggered; creates a new function on each render, 
      less efficient performance */
    <div className="card" data-key={cardKey} onClick={handleClick}>
      <PokemonImage pokemonName={pokemonName} />
      <h2>{pokemonName}</h2>
    </div>
  );
}

export default Card;
