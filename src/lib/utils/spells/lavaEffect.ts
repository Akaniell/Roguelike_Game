import type { Cell, GameBoard, SpellEffectFunc } from "$lib/Stores/types";
import { findPlayerCell } from "../entities/playerUtils";
import { applyDamageToCell } from "../entityUtils";

export const lavaEffect: SpellEffectFunc = (
  centerCell: Cell,
  spell,
  gameBoard,
  cellSize,
  launchSpellAnimation
) => {
  const playerCell = findPlayerCell(gameBoard);
  if (!playerCell) return;

  const startX = playerCell.x * cellSize + cellSize / 2;
  const startY = playerCell.y * cellSize + cellSize / 2;

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const x = centerCell.x + dx;
      const y = centerCell.y + dy;

      if (x < 0 || y < 0 || x >= gameBoard.width || y >= gameBoard.height) {
        continue;
      }

      const endX = x * cellSize + cellSize / 2;
      const endY = y * cellSize + cellSize / 2;

      launchSpellAnimation(
        "lava", // или "swamp" — в зависимости от спелла
        startX,
        startY,
        endX,
        endY,
        600 // длительность анимации в мс
      );

      applyDamageToCell(x, y, spell.damage ?? 5);
    }
  }
};
