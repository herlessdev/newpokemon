import { host } from "../data/data";

interface Props {
  name: string; 
  gender: string;
}

export async function nuevaPartida(datos: Props) {
  try {
    const response = await fetch(`${host}/api/v1/usuarios`, {
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
