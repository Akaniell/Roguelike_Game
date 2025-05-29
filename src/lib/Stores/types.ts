export interface Entity {
  id: string;
  name: string;
  type: "player" | "enemy" | "building";
  hp: number;
  image: string;
}

export interface Player extends Entity {
  coins: number;
  elements: string[],
  effects?: StatusEffect[];
}

export interface Enemy extends Entity {
  coinsReward: number;
  moveStrategy? : "straight" | "diagonal" | "zigzag";  
  attackRange: number,
  attackDamage: number,
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

export interface StatusEffect {
  id: string;
  name: string;
  icon?: string; 
  description?: string;
  duration?: number; 
}