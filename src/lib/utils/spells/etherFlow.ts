import type { Cell, GameBoard, SpellEffectFunc } from "$lib/Stores/types";
import { swapEntitiesInBoard } from "../board/boardUtils";
import { findPlayerCell } from "../entities/playerUtils";
import { gameBoardStore } from "$lib/Stores/gameBoardStore";

export const etherFlowEffect: SpellEffectFunc = (
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

  const endX = targetCell.x * cellSize + cellSize / 2;
  const endY = targetCell.y * cellSize + cellSize / 2;

  launchSpellAnimation(
    "etherFlow", 
    startX,
    startY,
    endX,
    endY,
    spell.animation?.duration ?? 300
  );

  if (
    targetCell.x < 0 ||
    targetCell.y < 0 ||
    targetCell.x >= gameBoard.width ||
    targetCell.y >= gameBoard.height
  ) return;

  const destCell = gameBoard.cells[targetCell.y][targetCell.x];
  if (destCell.entity != null) {
    return;
  }

  const updatedBoard = swapEntitiesInBoard(
    gameBoard,
    playerCell.x,
    playerCell.y,
    targetCell.x,
    targetCell.y
  );

  gameBoardStore.set(updatedBoard);
};
