import { gameBoardStore } from "$lib/Stores/gameBoardStore";
import type { Cell, GameBoard, SpellEffectFunc } from "$lib/Stores/types";
import { swapEntitiesInBoard } from "../board/boardUtils";
import { findPlayerCell } from "../entities/playerUtils";
import { applyDamageToCell } from "../entityUtils";

export const hurricaneEffect: SpellEffectFunc = (
  cell: Cell,
  spell,
  gameBoard,
  cellSize,
  launchSpellAnimation
) => {
  const playerCell = findPlayerCell(gameBoard);
  if (!playerCell) return;

  const { x: targetX, y: targetY } = cell;
  const { x: playerX, y: playerY } = playerCell;

  const startX = playerX * cellSize + cellSize / 2;
  const startY = playerY * cellSize + cellSize / 2;
  const endX = targetX * cellSize + cellSize / 2;
  const endY = targetY * cellSize + cellSize / 2;

  launchSpellAnimation(
    spell.animation?.type ?? "hurricane",
    startX,
    startY,
    endX,
    endY,
    spell.animation?.duration ?? 500
  );

  applyDamageToCell(targetX, targetY, spell.damage ?? 3);

  let dx = targetX - playerX;
  let dy = targetY - playerY;

  dx = dx === 0 ? 0 : dx / Math.abs(dx);
  dy = dy === 0 ? 0 : dy / Math.abs(dy);

  const knockbackDistance = spell.knockback ?? 2;

  function canMoveTo(x: number, y: number): boolean {
    if (x < 0 || y < 0 || x >= gameBoard.width || y >= gameBoard.height)
      return false;
    const cell = gameBoard.cells[y][x];
    return cell.entity == null;
  }


  let newX = targetX + dx * knockbackDistance;
  let newY = targetY + dy * knockbackDistance;

  if (!canMoveTo(newX, newY)) {
    newX = targetX + dx;
    newY = targetY + dy;

    if (!canMoveTo(newX, newY)) {
      return;
    }
  }

  const updatedBoard: GameBoard = swapEntitiesInBoard(
    gameBoard,
    targetX,
    targetY,
    newX,
    newY
  );

  gameBoardStore.set(updatedBoard);
};
