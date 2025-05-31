<script lang="ts">
  import BoardCell from "./BoardCell.svelte";
  import DebugControls from "./DebugControls.svelte";
  import { gameBoardStore, currentWaveStore } from "$lib/Stores/gameBoardStore";
  import { playerStore } from "$lib/Stores/playerStore";
  import { selectedElements, selectedSpellName } from "$lib/Stores/spellStore";
  import { spellCombinations } from "$lib/data/spellTemplates";
  import { enemiesStore } from "$lib/Stores/enemiesStore";
  import type { Cell, SpellCombination } from "$lib/Stores/types";
  import { handleCellAction, swapEntities } from "$lib/utils/board/boardUtils";
  import { spellEffectsMap } from "$lib/utils/spells/spellUtils";
  import { moveAllEnemies } from "$lib/utils/entities/enemyUtils";
  import { refreshPlayerEntityInBoard } from "$lib/utils/entities/playerUtils";

  $: player = $playerStore;

  let activeAction: string | null = null;
  let firstCell: { x: number; y: number } | null = null;

  function handleCellClick(cell: Cell) {
    if (!$selectedSpellName) {
      if (activeAction === "move") {
        if (!firstCell) {
          firstCell = { x: cell.x, y: cell.y };
        } else {
          swapEntities(firstCell.x, firstCell.y, cell.x, cell.y);
          firstCell = null;
          activeAction = null;
        }
      } else if (activeAction) {
        handleCellAction(cell.x, cell.y, activeAction);
        activeAction = null;
      }
      return;
    }

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

  function setActiveAction(action: string | null) {
    activeAction = action;
    firstCell = null;
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

<DebugControls {activeAction} {setActiveAction} {player} />

<style>
  .gameboard {
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
  }
</style>
