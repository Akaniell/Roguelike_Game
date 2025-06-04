import type { Cell, GameBoard, SpellEffectFunc } from "$lib/Stores/types";
import { swapEntitiesInBoard } from "../board/boardUtils";
import { findPlayerCell } from "../entities/playerUtils";
import { gameBoardStore } from "$lib/Stores/gameBoardStore";

export const flameVortexEffect: SpellEffectFunc = (
  targetCell: Cell,
  spell,
  gameBoard,
  cellSize,
  launchSpellAnimation
) => {
  const playerCell = findPlayerCell(gameBoard);
  if (!playerCell) return;

  const startX = playerCell.x * cellSize + cellSize / 2;
  const startY = playerCell.y * cellSize + cellSize / 2;

  const positionsToKnockback = [
    { x: targetCell.x, y: targetCell.y },
    { x: targetCell.x, y: targetCell.y - 1 },
    { x: targetCell.x, y: targetCell.y + 1 },
  ];

  const dx = targetCell.x - playerCell.x;
  const dy = targetCell.y - playerCell.y;
  const normDx = dx === 0 ? 0 : dx / Math.abs(dx);
  const normDy = dy === 0 ? 0 : dy / Math.abs(dy);

  let updatedBoard = gameBoard;

  for (const pos of positionsToKnockback) {
    if (
      pos.x < 0 ||
      pos.y < 0 ||
      pos.x >= gameBoard.width ||
      pos.y >= gameBoard.height
    ) {
      continue;
    }

    const endX = pos.x * cellSize + cellSize / 2;
    const endY = pos.y * cellSize + cellSize / 2;

    launchSpellAnimation(
      "flameVortex",
      startX,
      startY,
      endX,
      endY,
      spell.animation?.duration ?? 300
    );

    const newX = pos.x + normDx;
    const newY = pos.y + normDy;

    if (
      newX < 0 ||
      newY < 0 ||
      newX >= gameBoard.width ||
      newY >= gameBoard.height
    ) {
      continue;
    }

    const sourceCell = updatedBoard.cells[pos.y][pos.x];
    const destCell = updatedBoard.cells[newY][newX];

    if (sourceCell.entity != null && destCell.entity == null) {
      updatedBoard = swapEntitiesInBoard(updatedBoard, pos.x, pos.y, newX, newY);
    }
  }

  gameBoardStore.set(updatedBoard);
};
