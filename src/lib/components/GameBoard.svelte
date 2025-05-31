<script lang="ts">
  import BoardCell from "./BoardCell.svelte";
  import { gameBoardStore, currentWaveStore } from "$lib/Stores/gameBoardStore";
  import { selectedElements, selectedSpellName } from "$lib/Stores/spellStore";
  import { spellCombinations } from "$lib/data/spellTemplates";
  import { enemiesStore } from "$lib/Stores/enemiesStore";
  import type { Cell, SpellCombination } from "$lib/Stores/types";
  import { spellEffectsMap } from "$lib/utils/spells/spellUtils";
  import { moveAllEnemies } from "$lib/utils/entities/enemyUtils";
  import { refreshPlayerEntityInBoard } from "$lib/utils/entities/playerUtils";

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
    console.log(`Применяем заклинание "${spell.spellName}" на клетку`, cell);
    selectedElements.set([]);

    console.log("Текущий список врагов:", $enemiesStore);
    console.log("Текущая волна:", $currentWaveStore);

    const effectFunc = spellEffectsMap[spell.spellName];
    if (effectFunc) {
      effectFunc(cell, spell);
    } else {
      console.warn(`Нет обработчика для заклинания "${spell.spellName}"`);
    }
    moveAllEnemies();
    refreshPlayerEntityInBoard();
  }
</script>

<div class="gameboard">
  {#each $gameBoardStore.cells as row (row[0].y)}
    <div class="row">
      {#each row as cell (cell.x)}
        <BoardCell {cell} onClick={handleCellClick} />
      {/each}
    </div>
  {/each}
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
