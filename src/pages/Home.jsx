import React, { useState } from "react";
import FormHome from "../components/FormHome";
import Oak from './../assets/images/profesor-oak.png'
// import Footer from "../layout/Footer";
import "../styles/Home.css";
import { motion } from "framer-motion";

const Home = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  const handleToggleAnimation = () => {
    setShowAnimation(!showAnimation);
  };

  return (
    <>
    <main className="home">
      <motion.h1
       initial={{ opacity: 0,translateY:-10 }}
       whileInView={{ opacity: 1,translateY:20 }}
      >P<span>o</span>kedex</motion.h1>
      <motion.img
      initial={{ opacity: 0,scale:0.9 }}
      whileInView={{ opacity: 1,scale:1 }}
      id="Oak" src={Oak} alt="" />
      <div className={`home__name `}>
        <h2 className="home__subtitle">Howdy, trainer!</h2>
      </div>
      <FormHome />

    </main>
    </>
  );
};

export default Home;
