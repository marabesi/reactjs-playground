import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
        .then(response => response.json())
        .then(data => setPokemons(data.results));
  }, []);
  return (
    <div className="App">
      {pokemons.map(pokemon => <p key={pokemon.name}>{pokemon.name}</p>)}
    </div>
  );
}

export default App;
