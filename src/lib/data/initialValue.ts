import type { Player, Enemy, GameBoard } from "../Stores/types";

export const defaultPlayer: Player = {
  id: '1',
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

export const defaultEnemies: Enemy[] = []; // пустой массив врагов

export const defaultGameBoard: GameBoard = {
  width: 9,
  height: 7,
  cells: Array(7)
    .fill(null)
    .map((_, y) =>
      Array(9)
        .fill(null)
        .map((_, x) => ({ x, y, content: "empty" }))
    ),
};

// Добавим игрока на игровое поле по умолчанию
defaultGameBoard.cells[3][0].content = "player";
defaultGameBoard.cells[3][0].entity = { ...defaultPlayer };
