import React, {useContext} from "react";
import FavoriteContext from "./Context-favorites";

const Navbar = () => {
  const {favoritePokemons} = useContext(FavoriteContext);
  return (
    <nav>
      <div className="nav-content-container">
        <div>
          <img
            src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
            className="navbar-img"
          />
        </div>
        <div className="fav">
          {favoritePokemons.length}💖
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
