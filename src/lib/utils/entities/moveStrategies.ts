import type { Enemy, GameBoard, Cell } from "$lib/Stores/types";
import { findCellByEntityId } from "../board/boardUtils";
import { findPlayerCell } from "./playerUtils";

export type MoveStrategy = (
  enemy: Enemy,
  gameBoard: GameBoard
) => { x: number; y: number } | null;

// Стратегия "straight" — движение по прямой к игроку
export const moveStraight: MoveStrategy = (enemy, gameBoard) => {
  const enemyCell = findCellByEntityId(gameBoard, enemy.id);
  if (!enemyCell) return null;

  const playerCell = findPlayerCell(gameBoard);
  if (!playerCell) return null;

  const dx = playerCell.x - enemyCell.x;
  const dy = playerCell.y - enemyCell.y;

  let stepX = 0;
  let stepY = 0;

  if (Math.abs(dx) > Math.abs(dy)) {
    stepX = dx > 0 ? 1 : -1;
  } else if (dy !== 0) {
    stepY = dy > 0 ? 1 : -1;
  }

  return { x: enemyCell.x + stepX, y: enemyCell.y + stepY };
};

// Стратегия "diagonal" — движение по диагонали к игроку
export const moveDiagonal: MoveStrategy = (enemy, gameBoard) => {
  const enemyCell = findCellByEntityId(gameBoard, enemy.id);
  if (!enemyCell) return null;

  const playerCell = findPlayerCell(gameBoard);
  if (!playerCell) return null;

  const dx = playerCell.x - enemyCell.x;
  const dy = playerCell.y - enemyCell.y;

  const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
  const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1;

  return { x: enemyCell.x + stepX, y: enemyCell.y + stepY };
};

// Стратегия "zigzag" — пример зигзагообразного движения
export const moveZigzag: MoveStrategy = (enemy, gameBoard) => {
  const enemyCell = findCellByEntityId(gameBoard, enemy.id);
  if (!enemyCell) return null;

  const playerCell = findPlayerCell(gameBoard);
  if (!playerCell) return null;

  const dx = playerCell.x - enemyCell.x;
  const dy = playerCell.y - enemyCell.y;

  const moveAlongX = (enemyCell.x + enemyCell.y) % 2 === 0;

  let stepX = 0;
  let stepY = 0;

  if (moveAlongX && dx !== 0) {
    stepX = dx > 0 ? 1 : -1;
  } else if (dy !== 0) {
    stepY = dy > 0 ? 1 : -1;
  } else if (dx !== 0) {
    stepX = dx > 0 ? 1 : -1;
  }

  return { x: enemyCell.x + stepX, y: enemyCell.y + stepY };
};

export const moveStrategiesMap: Record<string, MoveStrategy> = {
  straight: moveStraight,
  diagonal: moveDiagonal,
  zigzag: moveZigzag,
};

export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
}