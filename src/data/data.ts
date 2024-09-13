import { Element, Personaje, Plant, Superficie } from "./types";

export interface mapaProps {
  superficie: Superficie;
  plant?: Plant | null;
  be?: Personaje | Element | null;
}

export default function crearSeed() {
  const mapa: mapaProps[][] = [];
  for (let i = 0; i < 20; i++) {
    const fila = [];
    for (let j = 0; j < 13; j++) {
      const sobre_superficie =
        Math.random() < 0.5
          ? hierva
          : null;

      fila.push({
        superficie: pasto,
        plant: sobre_superficie,
      });
    }
    mapa.push(fila);
  }
  mapa[0][10]= {
    plant: null,
    superficie: pasto
  }
 
  mapa[0][9] = {
    superficie: salto_inicio,
    plant: null
  }
  mapa[1][9] = {
    superficie: salto_continue,
    plant: null
  }
  mapa[2][9] =  {
    superficie: salto_fin,
    plant: null
  }
  mapa[3][9] = {
    superficie: pasto,
    be: rock
  }
  return mapa;
}
export const host = import.meta.env.VITE_APP_BACKEND_URL;

export function transformXP(xp: number) {
  if (xp === 0) return 1;
  const raizCubica = Math.cbrt(xp);
  return raizCubica;
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function probability(probability: number) {
  
  const resultProb = Math.random() < probability
  return resultProb
}

export const listPokemon = [1, 4, 7, 150, 10, 19, 35, 27, 43, 48];


export const pasto = new Superficie("pasto", 0, "yes");
export const tierra = new Superficie("tierra", 0, "yes");
export const salto_inicio = new Superficie("salto_inicio", 1, "no");
export const salto_continue = new Superficie("salto_continue", 1, "jump");
export const salto_fin = new Superficie("salto_fin", 1, "no");

export const bruno = new Personaje("bruno", 99, "no")
export const rock = new Element("rock", 1, "no");
export const hierva = new Plant("hierva", 1);
export const three_ld = new Element("three_ld", 1, "no")
export const three_rd = new Element("three_rd", 1, "no")

