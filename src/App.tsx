import { useEffect, useState } from "react";
import "./starWars.css";
import StarWarsCharacter from "./star_wars_character";

const App = () => {
  const [starWarsCharacter, setStarWarsCharacter] =
    useState<StarWarsCharacter>();
  const [errorText, setErrorText] = useState<string>("");

  const getStarWarsCharacter = async (characterIndex: number) => {
    const apiResponse = await fetch(
      `https://swapi.dev/api/people/${characterIndex}/`
    );

    if (apiResponse.status !== 200) {
      if (apiResponse.status === 418) {
        setErrorText("418 I'm a tea pot 🫖, silly")
      } else {
        setErrorText("Oops... something went wrong, try again 🤕");
      }
    } else {
      const json = await apiResponse.json() as StarWarsCharacter;
      setStarWarsCharacter(json);
    }
  };

  useEffect(() => {
    getStarWarsCharacter(1);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Star Wars</h1>
      </header>
      {errorText !== "" && <p>{errorText}</p>}
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
