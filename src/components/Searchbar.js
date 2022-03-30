import React, { useState } from "react";
import { searchPokemon } from "./api";

const Searchbar = () => {
  const [search, setSearch] = useState("Charizard");
  const [pokemon, setPokemon] = useState();

  function onChangeHandler(event) {
    const e = event.target.value;
    setSearch(e);
  }

  function onButtonClickHandler() {
    onSearchHandler(search);
  }

  const onSearchHandler = async (pokemon) => {
    const result = await searchPokemon(pokemon);
    setPokemon(result);
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input
          type="search"
          placeholder="Buscar Pokemon"
          onChange={onChangeHandler}
        />
      </div>
      <div className="searchbar-btn">
        <button type="button" onClick={onButtonClickHandler}>
          Buscar
        </button>
      </div>
      {pokemon ? (
        <div>
          <div>Nome: {pokemon.name}</div>
          <div>Peso: {pokemon.weight}</div>
          <img src={pokemon.sprites.front_default}></img>
        </div>
      ) : null}
    </div>
  );
};

export default Searchbar;
