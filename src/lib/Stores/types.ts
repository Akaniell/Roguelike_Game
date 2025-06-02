export interface Entity {
  id: string;
  name: string;
  type: "player" | "enemy" | "building";
  hp: number;
  image: string;
  maxHp: number;
}

export interface Player extends Entity {
  coins: number;
  elements: string[];
  effects?: StatusEffect[];
  unlockedSlotsCount: number;
}

export interface Enemy extends Entity {
  coinsReward: number;
  moveStrategy?: "straight" | "diagonal" | "zigzag";
  attackRange: number;
  attackDamage: number;
  story?: string;
}

export interface Building extends Entity {
  durationInWaves?: number;
  createdWave?: number; 
}

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

export interface SpellCombination {
  elements: [string, string];
  spellName: string;
  description: string;
  damage?: number;
  effect?: string;
  healing?: number;
  summon?: string;
  knockback?: number;
  duration?: number;
  animation?: {
    type: string;
    duration?: number;
  };
}

export interface SpellAnimation {
  id: string;
  type: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
}

export type SpellEffectFunc = (
  cell: Cell,
  spell: SpellCombination,
  gameBoard: GameBoard,
  cellSize: number,
  launchSpellAnimation: (
    type: string,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    duration?: number
  ) => void
) => void;

export type ShopItemType = "upgrade" | "oneTime";

export interface ShopItemBase {
  id: string;             
  name: string;            
  description: string;   
  price: number;         
  type: ShopItemType;     
  icon?: string;        
}

export interface UpgradeItem extends ShopItemBase {
  type: "upgrade";
  currentLevel: number;  
  maxLevel?: number;   
  effect: (player: Player) => Player; 
}

// Интерфейс одноразового предмета
export interface OneTimeItem extends ShopItemBase {
  type: "oneTime";
  purchased: boolean; 
  effect: (player: Player) => Player; 
}

export type ShopItem = UpgradeItem | OneTimeItem;