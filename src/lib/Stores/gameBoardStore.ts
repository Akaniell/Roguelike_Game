import type { GameBoard, Player } from "./types";
import { localStorageStore } from "./localStorageStore";

const initialGameBoard: GameBoard = {
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

initialGameBoard.cells[3][0].content = "player";
initialGameBoard.cells[3][0].entity = {
  id: '1',
  name: "Игрок",
  type: "player",
  hp: 100,
  elements: [],
  image: "/img/player/player.gif",
};

export const gameBoardStore = localStorageStore<GameBoard>(
  "gameBoard",
  initialGameBoard
);
