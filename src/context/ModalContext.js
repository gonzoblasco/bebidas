import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Crear el Context
export const ModalContext = createContext();

const ModalProvider = (props) => {
  // State del Provider
  const [idReceta, guardarIdReceta] = useState(null);
  const [receta, guardarReceta] = useState({});

  // Una vez que tenemos una recetea, llamar la API
  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idReceta) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
      const resultado = await axios.get(url);

      guardarReceta(resultado.data.drinks[0]);
    };

    obtenerReceta();
  }, [idReceta]);

  return (
    <ModalContext.Provider value={{ guardarIdReceta }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
