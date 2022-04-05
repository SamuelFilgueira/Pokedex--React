import "./App.css";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import Pokedex from "./components/Pokedex";
import { getPokemonData, getPokemons, searchPokemon } from "./components/api";
import Pokemon from "./components/Pokemon";
import Favorites from "./components/Context-favorites";
import { FavoriteProvider } from "./components/Context-favorites";

function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [load, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const itensPerPage = 27;

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });

      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage));
    } catch (error) {
      console.log("Erro:", error);
    }
  };
  const loadFavorite = () => {
    const pokemons = JSON.parse(localStorage.getItem('f') || []);
    setFavorites(pokemons);
  };

  const onSearchHandler = async (pokemon) =>{
    if(!pokemon){
      return fetchPokemons();
    }

    setLoading(true);
    setNotFound(false);

    const result = await searchPokemon(pokemon);
    if(!result) {
      setNotFound(true);
    } else{
      setPokemons([result]);
      setPage(0);
      setTotalPages(1);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadFavorite();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const updateFavoritePokemons = (poke_name) => {
    const updateFavorites = [...favorites];
    const favoriteIndex = favorites.indexOf(poke_name);
    favoriteIndex >= 0
      ? updateFavorites.splice(favoriteIndex, 1)
      : updateFavorites.push(poke_name);
    localStorage.setItem('f', JSON.stringify(updateFavorites));
    setFavorites(updateFavorites);
  };

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <div>
        <Navbar />
        <Searchbar onSearchHandler={onSearchHandler} />
        {notFound ? (
          <div class-name="not-found-text"> Não encontrado. </div>
        ) : (
          <Pokedex
            pokemons={pokemons}
            load={load}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </FavoriteProvider>
  );
}

export default App;
