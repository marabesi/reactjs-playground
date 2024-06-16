import './App.css';
import {useEffect, useState} from "react";
import {fetchData} from "./fetch";

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

// export default App;



export default function AppWithDep() {
  const [pokemons, setPokemons] = useState([]);
  const [id, setId] = useState(null);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const init = async() => {
      const data = await fetchData.get("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
      setPokemons(data.results);
    }

    init();
  }, []);

  useEffect(() => {
    const init = async() => {
      if (id) {
        const data = await fetchData.get("https://pokeapi.co/api/v2/pokemon/" + id);
        setDetails(data);
      }
    }
    init();
  }, [id]);

  if (details) {
    return (
      <div>
        <p>{details.id}</p>
        <p>{details.name}</p>
        <button onClick={() => setDetails(null)}>go back</button>
      </div>
    )
  }
  return (
    <div className="App">
        {pokemons.map((pokemon) => (
            <p key={pokemon.name} onClick={() => setId(pokemon.name)}>{pokemon.name}</p>
        ))}
      </div>
  );
}
