import type {
  Building,
  Cell,
  Enemy,
  GameBoard,
  Player,
} from "$lib/Stores/types";

export function findCellByEntityId(
  board: GameBoard,
  entityId: string
): Cell | null {
  for (const row of board.cells) {
    for (const cell of row) {
      if (cell.entity?.id === entityId) {
        return cell;
      }
    }
  }
  return null;
}

export function swapEntitiesInBoard(
  board: GameBoard,
  cell1X: number,
  cell1Y: number,
  cell2X: number,
  cell2Y: number
): GameBoard {
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

  const newCells = board.cells.map((row) =>
    row.map((cell) => ({
      ...cell,
      entity: cell.entity ? { ...cell.entity } : undefined,
    }))
  );

  const cell1 = newCells[cell1Y][cell1X];
  const cell2 = newCells[cell2Y][cell2X];

  const tempContent = cell1.content;
  const tempEntity = cell1.entity;

  cell1.content = cell2.content;
  cell1.entity = cell2.entity;

  cell2.content = tempContent;
  cell2.entity = tempEntity;

  return {
    ...board,
    cells: newCells,
  };
}
