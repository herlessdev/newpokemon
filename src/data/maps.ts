import {
  hierva,
  mapaProps,
  pasto,
  rock,
  salto_continue,
  salto_fin,
  salto_inicio,
  three_ld,
  three_rd,
} from "./data";

// Función para crear el mapa base
const createBaseMap = (rows: number, cols: number) => {
  const map = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push({ superficie: pasto });
    }
    map.push(row);
  }
  return map;
};

const applyCustomTiles1 = (map: mapaProps[][]) => {
  for (let row = 0; row < map.length; row++) {
    if (row % 2 === 0) {
      map[row][0] = { superficie: pasto, be: three_ld };
    } else {
      map[row][0] = { superficie: pasto, be: three_rd };
    }
  }
  map[16][0] = { superficie: pasto, be: null };
  map[17][0] = { superficie: pasto, be: null };
  for (let row = 4; row < 10; row++) {
    for (let col = 5; col < map[row].length - 4; col++) {
      map[row][col] = { ...map[row][col], plant: hierva };
    }
  }
  map[3][9] = { superficie: pasto, be: rock };
  map[4][9] = { superficie: salto_inicio };
  map[5][9] = { superficie: salto_continue };
  map[6][9] = { superficie: salto_continue };
  map[7][9] = { superficie: salto_continue };
  map[8][9] = { superficie: salto_continue };
  map[9][9] = { superficie: salto_fin };

  return map;
};

const rows = 20;
const cols = 13;
let map_1 = createBaseMap(rows, cols);

export default map_1 = applyCustomTiles1(map_1);

