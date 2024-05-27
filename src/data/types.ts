import { getRandomInt } from "./data";

export class Superficie {
  name: string;
  zIndex: number;
  available: string;

  constructor(name: string, zIndex: number, available: string) {
    this.name = name;
    this.zIndex = zIndex;
    this.available = available;
  }
}

export class Personaje {
  name: string;
  zIndex: number;
  available: string;

  constructor(name: string, zIndex: number, available: string) {
    this.name = name;
    this.zIndex = zIndex;
    this.available = available;
  }
}

export class Plant {
  name: string;
  zIndex: number;
  constructor(name: string, zIndex: number) {
    this.name = name;
    this.zIndex = zIndex;
  }
}

export class Element extends Personaje {
  constructor(name: string, zIndex: number, available: string) {
    super(name, zIndex, available);
  }
}

export class Pokemon {
  number: number;
  level: number;
  baseHP: number;
  ivs: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  evs: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  stats: { hp: number };

  constructor(number: number, level: number, baseHP: number) {
    this.number = number;
    this.level = level;
    this.baseHP = baseHP;
    this.ivs = {
      hp: getRandomInt(0, 32),
      attack: getRandomInt(0, 32),
      defense: getRandomInt(0, 32),
      specialAttack: getRandomInt(0, 32),
      specialDefense: getRandomInt(0, 32),
      speed: getRandomInt(0, 32),
    };
    this.evs = {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    };
    this.stats = this.calculateStats();
  }

  calculateStats() {
    const hp = this.calculateHP();

    return { hp };
  }
  calculateHP() {
    const baseHP = 50;
    const iv = this.ivs.hp;
    const ev = this.evs.hp;
    const level = this.level;
    return 10 + Math.floor((level / 100) * (baseHP * 2 + iv + ev));
  }
}
