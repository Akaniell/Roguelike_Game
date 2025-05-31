import type { Cell, SpellCombination } from "$lib/Stores/types";
import { applyDamageToCell, applyHealToCell } from "../entityUtils";

export function fireball(cell: Cell, spell: SpellCombination) {
  const damage = spell.damage ?? 10;
  const { x, y } = cell;
  applyDamageToCell(x, y, damage);
}

export function healingFlow(cell: Cell, spell: SpellCombination) {
  const healAmount = spell.healing ?? 15;
  const { x, y } = cell;
  applyHealToCell(x, y, healAmount);
}

export const spellEffectsMap: Record<string, (cell: Cell, spell: SpellCombination) => void> = {
  "Огненный шар": fireball,
  "Исцеляющий поток": healingFlow,
};