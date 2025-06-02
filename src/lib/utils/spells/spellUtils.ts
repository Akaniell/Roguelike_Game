import type {
  Cell,
  GameBoard,
  SpellCombination,
  SpellEffectFunc,
} from "$lib/Stores/types";
import { findPlayerCell } from "../entities/playerUtils";
import { applyDamageToCell, applyHealToCell } from "../entityUtils";

export function fireball(
  cell: Cell,
  spell: SpellCombination,
  gameBoard: GameBoard,
  cellSize: number,
  launchSpellAnimation: (
    type: string,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    duration?: number
  ) => void
) {
  const damage = spell.damage ?? 10;
  const playerCell = findPlayerCell(gameBoard);
  const { x, y } = cell;
  if (!playerCell) {
    applyDamageToCell(x, y, damage);
    return;
  }
  const startX = playerCell.x * cellSize + cellSize / 2;
  const startY = playerCell.y * cellSize + cellSize / 2;
  const endX = cell.x * cellSize + cellSize / 2;
  const endY = cell.y * cellSize + cellSize / 2;
  launchSpellAnimation(
    spell.animation?.type ?? "fireball",
    startX,
    startY,
    endX,
    endY,
    spell.animation?.duration ?? 500
  );
  applyDamageToCell(x, y, damage);
}

export function healingFlow(cell: Cell, spell: SpellCombination) {
  const healAmount = spell.healing ?? 15;
  const { x, y } = cell;
  applyHealToCell(x, y, healAmount);
}

export const spellEffectsMap: Record<string, SpellEffectFunc> = {
  "Огненный шар": fireball,
  "Исцеляющий поток": healingFlow,
  // добавляй другие спелы с соответствующими функциями
};
