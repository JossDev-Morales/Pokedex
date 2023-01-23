import React from "react";
import PokemonCard from "./PokemonCard";
import "../styles/ListPokemon.css";

const ListPokemon = ({ pokemons }) => {
  return (
    <div className="list__main">
      <ul className="list__pokemon">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
};

export default ListPokemon;
