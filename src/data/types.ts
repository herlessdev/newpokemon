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

