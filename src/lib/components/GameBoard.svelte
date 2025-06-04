<script lang="ts">
  import BoardCell from "./BoardCell.svelte";
  import { gameBoardStore, currentWaveStore } from "$lib/Stores/gameBoardStore";
  import { selectedElements, selectedSpellName } from "$lib/Stores/spellStore";
  import { spellCombinations } from "$lib/data/spellTemplates";
  import type {
    Cell,
    SpellAnimation,
    SpellCombination,
  } from "$lib/Stores/types";
  import { spellEffectsMap } from "$lib/utils/spells/spellUtils";
  import { moveAllEnemies } from "$lib/utils/entities/enemyUtils";
  import { refreshPlayerEntityInBoard } from "$lib/utils/entities/playerUtils";
  import SpellAnimationLayer from "./SpellAnimationLayer.svelte";

  let spellAnimations: SpellAnimation[] = [];

  function launchSpellAnimation(
    type: string,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    duration = 500
  ) {
    const id = crypto.randomUUID();
    spellAnimations = [
      ...spellAnimations,
      { id, type, startX, startY, endX, endY, duration },
    ];
  }

  function handleAnimationDone(id: string) {
    spellAnimations = spellAnimations.filter((anim) => anim.id !== id);
  }
  function handleCellClick(cell: Cell) {
    const spell = spellCombinations.find(
      (s) => s.spellName === $selectedSpellName
    );
    if (!spell) {
      return;
    }
    applySpellOnCell(spell, cell);
    selectedSpellName.set(null);
  }

  function applySpellOnCell(spell: SpellCombination, cell: Cell) {
    selectedElements.set([]);

    const effectFunc = spellEffectsMap[spell.spellName];
    if (effectFunc) {
      let cellSize = 80;
      effectFunc(cell, spell, $gameBoardStore, cellSize, launchSpellAnimation);
    } else {
      console.warn(`Нет обработчика для заклинания "${spell.spellName}"`);
    }
    moveAllEnemies();
    refreshPlayerEntityInBoard();
  }
</script>

<div class="gameboard-wrapper" style="position: relative;">
  <div class="gameboard">
    {#each $gameBoardStore.cells as row (row[0].y)}
      <div class="row">
        {#each row as cell (cell.x)}
          <BoardCell {cell} onClick={handleCellClick} />
        {/each}
      </div>
    {/each}
  </div>

  <SpellAnimationLayer
    animations={spellAnimations}
    onDone={handleAnimationDone}
  />
</div>

<style>
  .gameboard {
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
  }
</style>
