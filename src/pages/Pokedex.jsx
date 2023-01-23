import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import ListPokemon from "../components/ListPokemon";
import { paginationLogic } from "../helpers/paginationLogic";
import "../styles/Pokedex.css";


const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFilter, setPokemonsFilter] = useState([]);
  const [types, setTypes] = useState([]);
  const [namePokemon, setNamePokemon] = useState("");
  const [pokemonType, setPokemonType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const clearInput = () => {
    document.getElementById("namePokemon").value = "";
    setNamePokemon("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.namePokemon.value;
    setNamePokemon(name);
  };

  const handleChangeSelect = (e) => {
    setPokemonType(e.target.value);
  };

  const { lastPage, pagesInBlock, pokemonsInPage } = paginationLogic(
    currentPage,
    pokemonsFilter
  );

  const handleClickPage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    const newPage = currentPage + 1;
    if (newPage > lastPage) {
      setCurrentPage(1);
    } else {
      setCurrentPage(newPage);
    }
  };

  const handlePreviousPage = () => {
    const newPage = currentPage - 1;
    if (newPage < 1) {
      setCurrentPage(lastPage);
    } else {
      setCurrentPage(newPage);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(lastPage);
  };

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${
      pokemonType ? `type/${pokemonType}` : "pokemon/?limit=1000"
    }`;
    axios
      .get(URL)
      .then((res) => {
        if (pokemonType) {
          const newPokemons = res.data.pokemon.map(
            (pokemon) => pokemon.pokemon
          );
          setPokemons(newPokemons);
        } else {
          setPokemons(res.data.results);
        }
      })
      .catch((error) => console.log(error));
  }, [pokemonType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";
    axios
      .get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const newPokemons = pokemons.filter((pokemon) =>
      pokemon.name.includes(namePokemon)
    );
    setPokemonsFilter(newPokemons);
  }, [namePokemon, pokemons]);

  return (
    <main className="main-container">
      <Header />
      <form className="pokedex__form" onSubmit={handleSubmit}>
        <div className="pokedex__search">
          <input
            className="pokedex__input"
            type="text"
            placeholder="Search"
            id="namePokemon"
          />
          <button type="button" className="clear-button" onClick={clearInput}>
            X
          </button>
          <button className="pokedex__btn-search" type="submit">
            Search
          </button>
        </div>
        <select className="pokemon__select" onChange={handleChangeSelect}>
          <option value="">All</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </form>
      <ListPokemon pokemons={pokemonsInPage} />
      <ul className="pokedex__listPages">
        <li onClick={handlePreviousPage}>{"<<"}</li>
        {pagesInBlock.map((pageInBlock) => (
          <li
            className={currentPage === pageInBlock ? "actualPage" : ""}
            onClick={() => handleClickPage(pageInBlock)}
            key={pageInBlock}
          >
            {pageInBlock}
          </li>
        ))}
        <li onClick={handleNextPage}>{">>"}</li>
      </ul>
    </main>
  );
};

export default Pokedex;
