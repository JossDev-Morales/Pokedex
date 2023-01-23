import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Pokemon.css";
import { motion } from "framer-motion";

const Pokemon = () => {
  const [dataPokemon, setDataPokemon] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const getPercentBarProgress = (valueStat) => {
    const maxValue = 150;
    return (valueStat * 100) / maxValue;
  };

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios
      .get(URL)
      .then((res) =>{
        setDataPokemon(res.data)
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Función para volver a la pokedex
  const handleBackToPokedex = () => {
    navigate("/pokedex");
  };

  return (
    <main className="Pokemon">
      <button className="pokemon__nav-button" onClick={handleBackToPokedex}>
              Back to Pokedex
      </button>
      <motion.section initial={{opacity:0}} animate={{opacity:1}} className="pokemonId">
        <section
          className={`pokemonId__header bg-lg-${dataPokemon?.types[0].type.name}`}
        >
          <div className={`custom-shape-divider-bottom`} >
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
            </svg>
          </div>
        </section>
        <img
          className="pokemonId__img"
          src={
            dataPokemon?.sprites.other["official-artwork"].front_default || dataPokemon?.sprites.other.dream_world.front_default
          }
          alt=""
        />
        <h3 className="pokemonId__id">{dataPokemon?.id}</h3>
        <h2 className={`pokemonId__name bg-lg-${dataPokemon?.types[0].type.name}`}>{dataPokemon?.name}</h2>
        <section className="pokemonId__features">
          <div className={`pokemonId__feature bg-lg-${dataPokemon?.types[0].type.name}`}>
            <p className="pokemonId__feature-name">Weight: </p>
            <p className="pokemonId__feature-value">{dataPokemon?.weight}</p>
          </div>
          <div className={`pokemonId__feature bg-lg-${dataPokemon?.types[0].type.name}`}>
            <p className="pokemonId__feature-name">Height:</p>
            <p className="pokemonId__feature-value">{dataPokemon?.height}</p>
          </div>
        </section>
          <div className="pokemonId__types">
            <h4 className={`pokemonId__type-title bg-lg-${dataPokemon?.types[0].type.name}`}>Type</h4>
              {dataPokemon?.types.map((type) => (
                <p
                  className={`pokemonId__type-value bg-${type.type.name}`}
                  key={type.type.name}
                >
                  {type.type.name}
                </p>
              ))}
              
          </div>
          <div className="pokemonId__info-skills">
            <h4 className={`pokemonId__skill-title color-${dataPokemon?.types[0].type.name}`}>Abilities</h4>
              {dataPokemon?.abilities.map((ability) => (
                <p className={`pokemonId__skill-value bg-lg-${dataPokemon?.types[0].type.name}`} key={ability.ability.url}>
                  {ability.ability.name}
                </p>
              ))}
          </div>
        <section className={`pokemonId__stats color-${dataPokemon?.types[0].type.name}`}>
          <h2 className={`bg-lg-${dataPokemon?.types[0].type.name}`}>Stats</h2>
          <div className="stat">
            <p>{dataPokemon?.stats[0].stat.name}</p><span>{dataPokemon?.stats[0].base_stat}</span>
            <div className="bar">
              <motion.div initial={{width:2,opacity:0}}  whileInView={{opacity:1}} animate={{width: dataPokemon?.stats[0].base_stat+"%"}} className={`progress bg-lg-${dataPokemon?.types[0].type.name}`}></motion.div>
            </div>
          </div>
          <div className="stat">
          <p>{dataPokemon?.stats[1].stat.name}</p><span>{dataPokemon?.stats[1].base_stat}</span>
            <div className="bar">
              <motion.div initial={{width:2,opacity:0}}  whileInView={{opacity:1}} animate={{width: dataPokemon?.stats[1].base_stat+"%"}} className={`progress bg-lg-${dataPokemon?.types[0].type.name}`}></motion.div>
            </div>
          </div>
          <div className="stat">
          <p>{dataPokemon?.stats[2].stat.name}</p><span>{dataPokemon?.stats[2].base_stat}</span>
            <div className="bar">
              <motion.div initial={{width:2,opacity:0}}  whileInView={{opacity:1}} animate={{width: dataPokemon?.stats[2].base_stat+"%"}} className={`progress bg-lg-${dataPokemon?.types[0].type.name}`}></motion.div>
            </div>
          </div>
          <div className="stat">
          <p>{dataPokemon?.stats[5].stat.name}</p><span>{dataPokemon?.stats[5].base_stat}</span>
            <div className="bar">
              <motion.div initial={{width:2,opacity:0}}  whileInView={{opacity:1}} animate={{width: dataPokemon?.stats[5].base_stat+"%"}} className={`progress bg-lg-${dataPokemon?.types[0].type.name}`}></motion.div>
            </div>
          </div>
        </section>
                <h2 className={` moves color-${dataPokemon?.types[0].type.name}`}>Moves</h2>
                {dataPokemon?.moves?.map(e=>(<motion.p initial={{opacity:0}} whileInView={{opacity:1}} className={`move bg-lg-${dataPokemon?.types[0].type.name}`}>{e.move.name}</motion.p>))}
      </motion.section>
    </main>
  );
};

export default Pokemon;
