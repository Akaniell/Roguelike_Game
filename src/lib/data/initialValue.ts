import type { Player, Enemy, GameBoard, Cell, Building } from "../Stores/types";

export const defaultPlayer: Player = {
  id: "1",
  name: "Игрок",
  type: "player",
  hp: 100,
  maxHp: 100,
  coins: 0,
  elements: [],
  image: "/img/player/player.gif",
  effects: [],
  unlockedSlotsCount: 2,
};

export const defaultEnemies: Enemy[] = [];
export const defaultBuildings: Building[] = [];

function createDefaultGameBoard(): GameBoard {
  const width = 9;
  const height = 7;

  const cells: Cell[][] = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => ({
      x,
      y,
      content: "empty",
    }))
  );

  cells[3][0] = {
    ...cells[3][0],
    content: "player",
    entity: { ...defaultPlayer },
  };

  return {
    width,
    height,
    cells,
  };
}

export const defaultGameBoard = createDefaultGameBoard();
