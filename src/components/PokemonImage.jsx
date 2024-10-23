import { useState, useEffect } from "react";

function PokemonImage({ pokemonName }) {
  // state that stores the fetched Pokemon image Url
  const [pokemonImageUrl, setPokemonImageUrl] = useState("");
  // state that manages any errors that may occur during the fetch operation
  const [error, setError] = useState(null);

  /* ensures that the fetchPokemon request is triggered AFTER the component
    is displayed and whenever the pokemonName dependency changes */
  useEffect(() => {
    async function fetchPokemon() {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

      try {
        /* fetch the data from the API 
          use await to pause execution until fetch completes 
          mode: "cors" tells the browser to allow cross-origin requests
          allowing the server to respond with resources from a different domain */
        const response = await fetch(url, { mode: "cors" });

        // await the parsing of the JSON response
        const data = await response.json();

        /* access the image Url from the JSON response 
          set image URL to state */
        setPokemonImageUrl(data.sprites.front_default);
      } catch (error) {
        // handling errors
        console.error("Error fetching Pokemon data:", error);
        // error state is updated and error message is displayed
        setError("Failed to load Pokemon data");
      }
    }

    fetchPokemon();
    // effect runs every time pokemon prop changes
  }, [pokemonName]);

  return (
    <>
      {/* if error exists, handle it with the catch block 
      otherwise render the img element with its src attribute 
      assigned to pokemonImageUrl */}
      {error ? (
        <p>{error}</p>
      ) : (
        <img
          // value fro the src is a JS expression, a variable
          src={pokemonImageUrl}
          /* template literal, lets me embed JS expression inside string literal
            value of pokemonName variable is inserted into a string */
          alt={`${pokemonName}`}
          className="pokemonImage"
        />
      )}
    </>
  );
}

export default PokemonImage;
