import { useState, useEffect } from "react";

// child component that returns img element, with parent Card
function PokemonImage({ pokemonName }) {
  // state that stores the fetched Pokemon image Url
  const [pokemonImageUrl, setPokemonImageUrl] = useState("");
  // state that manages any errors that may occur during the fetch operation
  const [error, setError] = useState(null);

  /* ensures that the fetchPokemon request is triggered AFTER PokemonImage mounts/
  is displayed and whenever the pokemonName dependency changes */
  useEffect(() => {
    // async code reads like sync code and enables chaining of async operations
    async function fetchPokemon() {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

      try {
        /* fetches data from the API; await pauses execution until fetch completes 
        mode: "cors" allows the server to respond with resources from a 
        different domain */
        const response = await fetch(url, { mode: "cors" });

        // awaits the parsing of the JSON response
        const data = await response.json();

        // accesses the image Url from the JSON response and sets image Url to state
        setPokemonImageUrl(data.sprites.front_default);
      } catch (error) {
        // handles errors
        console.error("Error fetching Pokemon data:", error);
        // updates error state and displays error message
        setError("Failed to load Pokemon data");
      }
    }

    // fetches image of the pokemonName
    fetchPokemon();
    // effect runs every time pokemonName prop changes
  }, [pokemonName]);

  return (
    <>
      {/* if error exists, handle it with the catch block and error state 
      otherwise render the img element with its src attribute 
      assigned to pokemonImageUrl */}
      {error ? (
        <p>{error}</p>
      ) : (
        <img
          // value for the src is a JS expression, a state variable, the image Url
          src={pokemonImageUrl}
          /* template literal, lets me embed JS expression inside string literal
            value of pokemonName prop is inserted into a string */
          alt={`${pokemonName}`}
          className="pokemonImage"
        />
      )}
    </>
  );
}

export default PokemonImage;
