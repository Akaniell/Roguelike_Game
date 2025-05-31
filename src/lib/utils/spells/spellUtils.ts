import type { Cell, SpellCombination } from "$lib/Stores/types";
import { applyDamageToCell } from "../entityUtils";

export function fireball(cell: Cell, spell: SpellCombination) {
  const damage = spell.damage ?? 10;
  const { x, y } = cell;
  applyDamageToCell(x, y, damage);
}

export const spellEffectsMap: Record<string, (cell: Cell, spell: SpellCombination) => void> = {
  "Огненный шар": fireball,
  // Добавляй остальные
};