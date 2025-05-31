import { gameBoardStore } from "$lib/Stores/gameBoardStore";
import type {
  Building,
  Cell,
  Enemy,
  GameBoard,
  Player,
} from "$lib/Stores/types";
import { applyDamageToCell, applyHealToCell } from "../entityUtils";

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

export function applyDamageToCellInBoard(
  board: GameBoard,
  x: number,
  y: number,
  damage: number
): { board: GameBoard; updatedPlayer?: Player; enemyIdToRemove?: string } {
  let coinsReward = 0;
  let enemyIdToRemove: string | undefined;

  const newCells = board.cells.map((row) =>
    row.map((cell) => ({
      ...cell,
      entity: cell.entity ? { ...cell.entity } : undefined,
    }))
  );

  const cell = newCells[y][x];

  let updatedPlayer: Player | undefined;

  if (cell.entity && cell.entity.hp > 0) {
    switch (cell.entity.type) {
      case "player":
        {
          const playerEntity = cell.entity as Player;
          playerEntity.hp -= damage;

          updatedPlayer = { ...playerEntity };

          if (playerEntity.hp <= 0) {
            cell.content = "empty";
            cell.entity = undefined;
          }
        }
        break;

      case "enemy":
        {
          const enemyEntity = cell.entity as Enemy;
          enemyEntity.hp -= damage;

          if (enemyEntity.hp <= 0) {
            coinsReward = enemyEntity.coinsReward || 0;
            enemyIdToRemove = enemyEntity.id;
            cell.content = "empty";
            cell.entity = undefined;
          }
        }
        break;

      default:
        console.log(`Неизвестный тип сущности (${cell.entity.type})`);
    }
  } else {
    console.log(`В клетке (${x}, ${y}) нет сущности для нанесения урона.`);
  }

  return {
    board: {
      ...board,
      cells: newCells,
    },
    updatedPlayer,
    enemyIdToRemove,
  };
}
