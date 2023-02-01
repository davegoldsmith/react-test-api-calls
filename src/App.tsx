import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import StarWarsCharacter from "./star_wars_character";

const App = () => {
  const [starWarsCharacter, setStarWarsCharacter] =
    useState<StarWarsCharacter>();

  const getStarWarsCharacter = async (characterIndex: number) => {
    // Utilised Axios for API calls
    const apiResponse = await axios.get(
      `https://swapi.dev/api/people/${characterIndex}/`
    );
    setStarWarsCharacter(apiResponse.data);
  };

  useEffect(() => {
    getStarWarsCharacter(1);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Star Wars</h1>
      </header>
      {starWarsCharacter && (
        <div>
          <p>Name: {starWarsCharacter.name}</p>
          <p>Height: {starWarsCharacter.height}</p>
          <p>Hair Colour: {starWarsCharacter.hair_color}</p>
        </div>
      )}
    </div>
  );
};

export default App;
