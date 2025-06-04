import type { Cell, GameBoard, SpellEffectFunc } from "$lib/Stores/types";
import { applyDamageToCell } from "../entityUtils";

export const steamExplosionEffect: SpellEffectFunc = (
  centerCell: Cell,
  spell,
  gameBoard,
  cellSize,
  launchSpellAnimation
) => {
  const cellCenterX = (centerCell.x - 1) * cellSize + cellSize / 2;
  const cellCenterY = (centerCell.y - 1) * cellSize + cellSize / 2;

  launchSpellAnimation(
    "steamExplosion",
    cellCenterX,
    cellCenterY,
    cellCenterX,
    cellCenterY,
    1200
  );

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const x = centerCell.x + dx;
      const y = centerCell.y + dy;

      if (x < 0 || y < 0 || x >= gameBoard.width || y >= gameBoard.height) {
        continue;
      }

      applyDamageToCell(x, y, spell.damage ?? 5);
    }
  }
};
