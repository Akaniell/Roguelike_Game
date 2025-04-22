import { gameBoardStore } from "$lib/Stores/gameBoardStore";
import type { Building, Enemy, Player } from "$lib/Stores/types";
import { applyDamageToCell, applyHealToCell } from "../entityUtils";

export function placeEntityOnBoard(
  entity: Enemy | Player | Building,
  x: number,
  y: number
) {
  gameBoardStore.update((board) => {
    board.cells[y][x].content = entity.type as
      | "empty"
      | "player"
      | "enemy"
      | "building";
    board.cells[y][x].entity = entity;
    return board;
  });
}

export function removeEntityFromBoard(x: number, y: number) {
  gameBoardStore.update((board) => {
    board.cells[y][x].content = "empty";
    board.cells[y][x].entity = undefined;
    return board;
  });
}

export function swapEntities(
  cell1X: number,
  cell1Y: number,
  cell2X: number,
  cell2Y: number
) {
  gameBoardStore.update((board) => {
    if (
      cell1Y < 0 ||
      cell1Y >= board.height ||
      cell1X < 0 ||
      cell1X >= board.width ||
      cell2Y < 0 ||
      cell2Y >= board.height ||
      cell2X < 0 ||
      cell2X >= board.width
    ) {
      console.error("Invalid cell coordinates for swap!");
      return board;
    }

    const cell1 = board.cells[cell1Y][cell1X];
    const cell2 = board.cells[cell2Y][cell2X];

    const tempContent = cell1.content;
    const tempEntity = cell1.entity;

    cell1.content = cell2.content;
    cell1.entity = cell2.entity;

    cell2.content = tempContent;
    cell2.entity = tempEntity;

    console.log(
      `Обмен сущностей между (${cell1X}, ${cell1Y}) и (${cell2X}, ${cell2Y})`
    );

    return board;
  });
}

export function handleCellAction(
  x: number,
  y: number,
  action: string,
  amount: number = 10
) {
  switch (action) {
    case "damage":
      applyDamageToCell(x, y, amount);
      break;
    case "heal":
      applyHealToCell(x, y, amount);
      break;
    default:
      console.log(`Неизвестное действие "${action}" для клетки (${x}, ${y})`);
  }
}
