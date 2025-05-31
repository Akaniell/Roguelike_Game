import { gameBoardStore } from "$lib/Stores/gameBoardStore";
import type { Cell, GameBoard, Player } from "$lib/Stores/types";

export function movePlayerToBoard(player: Player, x: number, y: number) {
  gameBoardStore.update((board) => {
    if (board.cells[y][x].content !== "empty") {
      throw new Error(`Клетка (${x}, ${y}) не пуста`);
    }
    for (let i = 0; i < board.height; i++) {
      for (let j = 0; j < board.width; j++) {
        if (board.cells[i][j].content === "player") {
          board.cells[i][j].content = "empty";
          board.cells[i][j].entity = undefined;
        }
      }
    }
    board.cells[y][x].content = "player";
    board.cells[y][x].entity = player;
    return board;
  });
}

export function findPlayerCell(gameBoard: GameBoard): Cell | null {
  for (const row of gameBoard.cells) {
    for (const cell of row) {
      if (cell.content === "player") {
        return cell;
      }
    }
  }
  return null;
}