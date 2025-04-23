export interface Entity {
  id: string;
  name: string;
  type: "player" | "enemy" | "building";
  hp: number;
}

export interface Player extends Entity {
  coins: number;
}

export interface Enemy extends Entity {
  coinsReward: number;
}

export interface Building extends Entity {}

export interface Cell {
  x: number;
  y: number;
  content: "empty" | "player" | "enemy" | "building";
  entity?: Enemy | Player | Building;
}

export interface GameBoard {
  width: number;
  height: number;
  cells: Cell[][];
}
