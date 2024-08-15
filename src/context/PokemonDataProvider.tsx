import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getPokemonById } from "../services/get";

export const PokemonDataContext = createContext<unknown>([]);

export const PokemonDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pokemonData, setPokemonData] = useState<any>([]);
  useEffect(() => {
    const loadPokemonData = async () => {
      try {
        const pokemonIdsToLoad = Array.from(
          { length: 150 },
          (_, index) => index + 1
        );
        const pokemonDataPromises = pokemonIdsToLoad.map(getPokemonById);
        const loadedPokemonData = await Promise.all(pokemonDataPromises);
        setPokemonData(loadedPokemonData);
      } catch (error) {
        console.error("Error al cargar los datos de los Pokémon:", error);
      }
    };
    loadPokemonData();
  }, []);
  return (
    <PokemonDataContext.Provider value={pokemonData}>
      {children}
    </PokemonDataContext.Provider>
  );
};
