export default function crearSeed() {
  const mapa: { superficie: string; 1: string; especie?: string }[][] = [];
  for (let i = 0; i < 20; i++) {
    const fila = [];
    for (let j = 0; j < 13; j++) {
      const sobre_superficie = Math.random() < 0.5 ? "hierva" : "";
      fila.push({ superficie: "pasto", 1: sobre_superficie });
    }
    mapa.push(fila);
  }
  mapa[0][10][1] = "";
  mapa[0][9][1] = "salto_inicio";
  mapa[1][9][1] = "salto_continue";
  mapa[2][9][1] = "salto_fin";

  return mapa;
}

export const host = "https://backendpokemon.onrender.com";

export function transformXP(xp: number) {
  if (xp === 0) return 1;
  const raizCubica = Math.cbrt(xp);
  return raizCubica;
}
