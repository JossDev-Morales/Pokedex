import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PokemonCard.css";
import { motion } from "framer-motion"

const PokemonCard = ({ pokemon }) => {
  const [dataPokemon, setDataPokemon] = useState();
  const types = dataPokemon?.types.map((type) => type.type.name).join(" / ");
  const navigate = useNavigate();
  const handleClickPokemon = () => {
    navigate(`/pokedex/${dataPokemon?.id}`);
  };

  useEffect(() => {
    axios
      .get(pokemon.url)
      .then((res) => setDataPokemon(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0,scale:0.95 }}
      whileInView={{ opacity: 1,scale:1 }}
      onClick={handleClickPokemon}
      className={`pokemon-card border-${dataPokemon?.types[0].type.name}`}
    >
      <section className="pokemon-card__image-section">
        <img
          src={dataPokemon?.sprites.other["official-artwork"].front_default}
          alt=""
          className={`pokemon-card__image bg-lg-${dataPokemon?.types[0].type.name}`}
        />
      </section>
      <section className="pokemon-card__info-section">
        <h3 className="pokemon-card__name">
          {dataPokemon?.name}
        </h3>
        <p className="pokemon-card__description">Types:</p>
        <p className="pokemon-card__type">{types}</p>
        <hr />
        <section className="pokemon-card__stats-section">
          <div className="pokemon-card__stats-container">
            <p className="pokemon-card__stat">
              <span className="pokemon-card__stat-name">HP:</span>
              {dataPokemon?.stats[0].base_stat}
              <span className="pokemon-card__stat-name">Height:</span>

              <span className="pokemon-card__stat-value">
                {dataPokemon?.height * 10} cm
              </span>
            </p>
            <section className="pokemon-card__stat">
              {dataPokemon?.stats.map((stat) => (
                <div key={stat.stat.name} className="pokeCard__stat">
                  <p className="pokeCard__stat-name">
                    {stat.stat.name.toUpperCase()}
                  </p>
                  <p className="pokeCard__stat-value">{stat.base_stat}</p>
                </div>
              ))}
            </section>
          </div>
        </section>
      </section>
    </motion.div>
  );
};

export default PokemonCard;
