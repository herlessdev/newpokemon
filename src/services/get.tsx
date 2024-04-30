import { host } from "../data/data";

export async function getPokemonById(id: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`No se pudo obtener el Pokémon con el ID ${id}`);
  }
  const data = await response.json();
  return data;
}

export async function getMoveById(id: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/move/${id}`);
  if (!response.ok) {
    throw new Error(`No se pudo obtener el movimiento con el ID ${id}`);
  }
  const data = await response.json();
  return data;
}

export async function cargarPartidas() {
  const response = await fetch(`${host}/api/v1/usuarios`);
  if (!response.ok) {
    throw new Error('No se pudo cargar las partidas');
  }
  const data = await response.json();
  return data;
}

export async function cargarPartidaByID(id: number) {
  const response = await fetch(`${host}/api/v1/usuarios/${id}`);
  if (!response.ok) {
    throw new Error(`No se pudo obtener la partida con el ID ${id}`);
  }
  const data = await response.json();
  return data;
}
