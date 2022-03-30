import React from "react";
import Pokemon from "./Pokemon";
import Pagination from "./Pagination";

export const Pokedex = (props) => {
  const { pokemons, load, page, setPage, totalPages } = props;
  const onPreviousClick = () => {
    if(page > 0 ){
      setPage(page - 1);
    }
  };
  const onNextClick = () => {
    if(page >= 0){
      setPage(page + 1)
    }
  };

  return (
    <div>
      <div className="pokedex-header">
        <h1>Pokedex</h1>
        <Pagination
          page={page + 1}
          totalPages={totalPages}
          previousClick={onPreviousClick}
          nextClick={onNextClick}
        ></Pagination>
      </div>
      {load ? (
        <div>Carregando, segura fera...</div>
      ) : (
        <div className="pokedex-grid">
          {pokemons &&
            pokemons.map((pokemon, index) => {
              return <Pokemon key={index} pokemon={pokemon} />;
            })}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
