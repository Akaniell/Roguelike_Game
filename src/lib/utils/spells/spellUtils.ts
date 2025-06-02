import type {
  Cell,
  GameBoard,
  SpellCombination,
  SpellEffectFunc,
} from "$lib/Stores/types";
import { get } from "svelte/store";
import { findPlayerCell } from "../entities/playerUtils";
import { applyDamageToCell, applyHealToCell } from "../entityUtils";
import { currentWaveStore } from "$lib/Stores/gameBoardStore";
import { placeBuildingOnField } from "../entities/buildingUtils";

type EffectAction = (x: number, y: number, amount: number) => void;

interface EffectConfig {
  amountKey: keyof SpellCombination;
  action: EffectAction; 
  defaultAmount: number;
}

export function createSpellEffect(config: EffectConfig): SpellEffectFunc {
  return function (
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
    const rawAmount = spell[config.amountKey];
    const amount =
      typeof rawAmount === "number" ? rawAmount : config.defaultAmount;
    const playerCell = findPlayerCell(gameBoard);
    const { x, y } = cell;

    if (!playerCell) {
      config.action(cell.x, cell.y, amount);
      return;
    }

    const startX = playerCell.x * cellSize + cellSize / 2;
    const startY = playerCell.y * cellSize + cellSize / 2;
    const endX = x * cellSize + cellSize / 2;
    const endY = y * cellSize + cellSize / 2;

    launchSpellAnimation(
      spell.animation?.type ?? config.amountKey,
      startX,
      startY,
      endX,
      endY,
      spell.animation?.duration ?? 500
    );

    config.action(cell.x, cell.y, amount);
  };
}

export const stoneWall: SpellEffectFunc = (
  cell: Cell,
  spell: SpellCombination,
  gameBoard: GameBoard,
  cellSize: number,
  launchSpellAnimation
) => {
  // Просто вызываем функцию установки постройки на поле
  placeBuildingOnField("stone-wall", cell.x, cell.y);

  // Анимации нет, поэтому ничего не вызываем
};

export const fireball = createSpellEffect({
  amountKey: "damage",
  action: applyDamageToCell,
  defaultAmount: 10,
});

export const healingFlow = createSpellEffect({
  amountKey: "healing",
  action: applyHealToCell,
  defaultAmount: 15,
});


export const spellEffectsMap: Record<string, SpellEffectFunc> = {
  "Огненный шар": fireball,
  "Исцеляющее касание": healingFlow,
  "Каменная стена": stoneWall,
};
