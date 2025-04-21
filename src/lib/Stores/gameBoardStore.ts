import type { GameBoard, Player } from "./types";
import { localStorageStore } from "./localStorageStore";

const initialGameBoard: GameBoard = {
  width: 7,
  height: 5,
  cells: Array(5)
    .fill(null)
    .map((_, y) =>
      Array(7)
        .fill(null)
        .map((_, x) => ({ x, y, content: 'empty' }))
    ),
};

// Инициализация игрока на поле
initialGameBoard.cells[2][0].content = "player";
initialGameBoard.cells[2][0].entity = {
  id: 1,
  name: "Игрок",
  type: "player",
  hp: 100,
};

export const gameBoardStore = localStorageStore<GameBoard>(
  "gameBoard",
  initialGameBoard
);
