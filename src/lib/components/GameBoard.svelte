<script lang="ts">
  import BoardCell from "./BoardCell.svelte";
  import DebugControls from "./DebugControls.svelte";
  import { currentWaveStore, gameBoardStore } from "$lib/Stores/gameBoardStore";
  import { playerStore } from "$lib/Stores/playerStore";
  import type {
    Cell,
    GameBoard,
    Player,
    SpellCombination,
  } from "$lib/Stores/types";
  import { handleCellAction, swapEntities } from "$lib/utils/board/boardUtils";
  import { selectedElements, selectedSpellName } from "$lib/Stores/spellStore";
  import { spellCombinations } from "$lib/data/spellTemplates";
  import { enemiesStore } from "$lib/Stores/enemiesStore";

  let gameBoard: GameBoard;
  let player: Player;
  let currentSelectedSpellName: string | null = null;

  $: gameBoardStore.subscribe((value) => (gameBoard = value));
  $: playerStore.subscribe((value) => (player = value));
  $: selectedSpellName.subscribe((value) => (currentSelectedSpellName = value));

  let activeAction: string | null = null;
  let firstCell: { x: number; y: number } | null = null;

  function handleCellClick(cell: Cell) {
    if (!currentSelectedSpellName) {
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
      (s) => s.spellName === currentSelectedSpellName
    );
    if (!spell) {
      console.warn("Заклинание не найдено:", currentSelectedSpellName);
      return;
    }
    applySpellOnCell(spell, cell);
    selectedSpellName.set(null);
  }

  function applySpellOnCell(spell: SpellCombination, cell: Cell) {
    console.log(`Применяем заклинание "${spell.spellName}" на клетку`, cell);
    selectedElements.set([]);
    // TODO: Реализовать механику применения заклинания
    enemiesStore.subscribe((enemies) => {
      console.log("Текущий список врагов:", enemies);
    });
    currentWaveStore.subscribe((wave)=>{
      console.log(wave);
    })
  }

  function setActiveAction(action: string | null) {
    activeAction = action;
    firstCell = null;
  }
</script>

<div class="gameboard">
  {#each gameBoard.cells as row (row[0].y)}
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
