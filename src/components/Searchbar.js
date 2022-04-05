import React, { useState } from "react";
import { searchPokemon } from "./api";

const Searchbar = (props) => {
  const [search, setSearch] = useState("Charizard");
  const {onSearchHandler} = props;

  function onChangeHandler(event) {
    const e = event.target.value;
    setSearch(e);
    if(e.length === 0) {
      onSearchHandler(undefined)
    }
  }

  function onButtonClickHandler() {
    onSearchHandler(search);
  }


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
    </div>
  );
};

export default Searchbar;
