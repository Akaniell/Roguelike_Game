import { gameBoardStore } from "$lib/Stores/gameBoardStore";
import { playerStore } from "$lib/Stores/playerStore";
import type { Cell, GameBoard, Player } from "$lib/Stores/types";
import { get } from "svelte/store";

export function movePlayerToBoard(x: number, y: number) {
  const player = get(playerStore);
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

export function refreshPlayerEntityInBoard() {
  const player = get(playerStore);
  gameBoardStore.update((board) => {
    const newCells = board.cells.map((row) =>
      row.map((cell) => {
        if (cell.content === "player") {
          return { ...cell, entity: player };
        }
        return cell;
      })
    );
    return { ...board, cells: newCells };
  });
}
