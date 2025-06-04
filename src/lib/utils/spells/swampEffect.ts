import type { Cell, GameBoard, SpellEffectFunc } from "$lib/Stores/types";
import { applyDamageToCell } from "../entityUtils";

export const swampEffect: SpellEffectFunc = (
  centerCell: Cell,
  spell,
  gameBoard,
  cellSize,
  launchSpellAnimation
) => {

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const x = centerCell.x + dx;
      const y = centerCell.y + dy;

      if (x < 0 || y < 0 || x >= gameBoard.width || y >= gameBoard.height) {
      continue;
    }

      const cellCenterX = x * cellSize + cellSize / 2;
      const cellCenterY = y * cellSize + cellSize / 2;

      launchSpellAnimation(
        "swamp",
        cellCenterX, 
        cellCenterY,
        cellCenterX, 
        cellCenterY,
        1200
      );

      applyDamageToCell(x, y, spell.damage ?? 5);
    }
  }
};
