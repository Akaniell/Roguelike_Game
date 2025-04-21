<script lang="ts">
  import CellComponent from "./Cell.svelte";
  import DebugControls from "./DebugControls.svelte";

  import { handleCellAction, swapEntities } from "$lib/utils/gameUtils";

  import { gameBoardStore } from "$lib/Stores/gameBoardStore";
  import { playerStore } from "$lib/Stores/playerStore";

  import type { Cell, GameBoard, Player } from "$lib/Stores/types";

  let gameBoard: GameBoard;
  let player: Player;

  $: gameBoardStore.subscribe((value) => (gameBoard = value));
  $: playerStore.subscribe((value) => (player = value));

  let activeAction: string | null = null;
  let firstCell: { x: number; y: number } | null = null;

  function handleCellClick(cell: Cell) {
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
        <CellComponent {cell} onClick={handleCellClick} />
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
