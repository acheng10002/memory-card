import PokemonImage from "./PokemonImage.jsx";

function Card({ pokemonName, handleClick }) {
  return (
    /* onClick={handleClick} - passes a reference to the function, React 
      invokes handleClick when the event is triggered; doesn't create a new
      function, more efficient performance 
      vs. onClick={() => handleClick()} - function call inside an arrow function
      creates an anonymous function that will call handleClick when onClick event 
      is triggered; creates a new function on each render, 
      less efficient performance */
    <div className="card" onClick={handleClick}>
      <PokemonImage pokemonName={pokemonName} />
      <h2>{pokemonName}</h2>
    </div>
  );
}

export default Card;
