import { host } from "../data/data";
import { Pokemon } from "../data/types";

interface Props {
  name: string; 
  gender: string;
}

export async function nuevaPartida(datos: Props) {
  try {
    const response = await fetch(`${host}/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    const data = await response.json();
    console.log("Usuario creado exitosamente:", data);
    return data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
}

export async function addPokemon(datos: Pokemon) {
  try {
    const response = await fetch(`${host}/api/v1/pokemons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    const data = await response.json();
    console.log("Pokemon captured successfully:", data);
    return data;
  } catch (error) {
    console.error("Error when capturing pokemon", error);
    throw error;
  }
}
