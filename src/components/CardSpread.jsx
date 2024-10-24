import { useState, useEffect } from "react";
import LeftSideHeader from "./LeftSideHeader.jsx";
import RightSideScoreboard from "./RightSideScoreboard.jsx";
import Card from "./Card.jsx";

// pokemonName array of pokemon to appear on Card components
const pokemonSet = [
  "pikachu",
  "charizard",
  "bulbasaur",
  "squirtle",
  "eevee",
  "mewtwo",
  "jigglypuff",
  "lucario",
  "gengar",
  "snorlax",
  "greninja",
  "meowth",
];

// utility with shuffle set logic
function shuffleSet(array) {
  return (
    array
      /* .map creates a new array with each element turned into an object
      that has two properties, value and sort
      sort's value is random number generated by Math.random */
      .map((value) => ({ value, sort: Math.random() }))
      /* sorts the array of objects created in the previous step
      .sort compares the sort property for each object
      if a.sort is smaller, the element gets moved before, 
      if it's larger, it gets moved after */
      .sort((a, b) => a.sort - b.sort)
      /* ({ value }) destructures the object and extracts just the 
      value properties from the array of objects,
      returning just the shuffled values in their new order */
      .map(({ value }) => value)
  );
}

// parent CardSpread component for LeftSideHeader, RightSideScoreboard, and Card
function CardSpread() {
  // states that manages the shuffledPokemonSet array
  const [shuffledPokemonSet, setShuffledPokemonSet] = useState(
    shuffleSet(pokemonSet)
  );
  // state that manages clickedPokemonSet array of cards already clicked
  const [clickedPokemonSet, setClickedPokemonSet] = useState([]);

  // state that manages current score
  const [score, setScore] = useState(0);

  // state that manages bestScore since initial rendering
  const [bestScore, setBestScore] = useState(0);

  /* effect shuffles pokemonSet AFTER CardSpread mounts 
  this initial shuffle happens independently of the click events, so game starts
  with a random order of cards */
  useEffect(() => {
    setShuffledPokemonSet(shuffleSet(pokemonSet));
    /* empty dependency arrray means, does it only once when the component mounts 
    and not on subsequent re-renders */
  }, []);

  // handles shuffle logic when player clicks on a previously clicked card
  const resetGame = () => {
    // resets scorekeeping
    setScore(0);
    // resets tracking of clicked pokemon
    setClickedPokemonSet([]);
    // shuffle pokemonSet when the game resets
    setShuffledPokemonSet(shuffleSet(pokemonSet));
  };

  /* handles clicks: either updating the clickedPokemonSet and score when
  a new card is clicked or calls resetGame when a duplicate card is clicked */
  const handleClick = (event) => {
    // extracts cardKey value from the clicked card's data-key attribute
    const cardKey = event.currentTarget.dataset.key;

    /* if the clickedPokemonSet state does not include the new card 
    i.e. if the card with that cardKey hasn't been clicked before */
    if (!clickedPokemonSet.includes(cardKey)) {
      // create a new array with the new cardKey/card
      setClickedPokemonSet([...clickedPokemonSet, cardKey]);

      /* functional form of setScore, ensures that prevScore is the most
      up-to-date value of the score (even if multiple updates are
      batched together, I get the latest score and update it correctly) */
      setScore((prevScore) => {
        // increments the current score and returns it
        const newScore = prevScore + 1;
        return newScore;
      });
      // triggers re-render causing cards to be displayed in a new order
      setShuffledPokemonSet(shuffleSet(shuffledPokemonSet));
    } else {
      /* have to use the functional form of setBestScore too, ensures
      that the most up-to-date value of prevBestScore is compared against
      the up-to-date score, which hasn't been changed yet by setScore(0) */
      setBestScore((prevBestScore) => Math.max(prevBestScore, score));
      // zeros out the current score and resets tracking of clicked pokemons
      resetGame();
    }
  };

  return (
    <>
      <div className="header">
        <LeftSideHeader />
        {/* component renders the actual values fo the props, score and
        bestScore, inside the <p> tags as text */}
        <RightSideScoreboard score={score} bestScore={bestScore} />
      </div>
      <div className="card-spread">
        {/* for each pokemon in the shuffledPokemonSet, create a 
        Card component */}
        {shuffledPokemonSet.map((pokemonName) => (
          <Card
            /* component has a key, cardKey prop, pokemonName prop (that will 
            be passed to the PokemonImage component), and handleClick prop */
            key={pokemonName}
            /* cardKey is custom prop for event handling 
            it gets passed down as an identifier for each Card 
            it's for game logic, for tracking which cards have already been clicked */
            cardKey={pokemonName}
            /* pokemonName prop is for display
            it gets passed down to Card and PokemonImage for display */
            pokemonName={pokemonName}
            handleClick={handleClick}
          />
        ))}
      </div>
    </>
  );
}

export default CardSpread;
