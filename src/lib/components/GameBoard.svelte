<script lang="ts">
  import {
    gameBoardStore,
    playerStore,
    type GameBoard,
    type Player,
    type Cell,
  } from "$lib/Stores/localstorage";
  import {
    handleCellAction,
    swapEntities,
    movePlayerToBoard,
    getEntityInfo, // Импортируем getEntityInfo
  } from "$lib/utils/gameUtils";
  import { onMount } from "svelte";
  import CellComponent from "./Cell.svelte";

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

  function handleActionClick(action: string) {
    activeAction = action;
    firstCell = null;
  }
</script>

<div class="gameboard">
  {#each gameBoard.cells as row (row[0].y)}
    <div class="row">
      {#each row as cell (cell.x)}
        <!-- Используем CellComponent вместо Cell -->
        <CellComponent {cell} onClick={handleCellClick} />
      {/each}
    </div>
  {/each}

  <h1>Посадить игрока в Случайную клетку</h1>
  <button
    on:click={() =>
      movePlayerToBoard(
        player,
        Math.floor(Math.random() * gameBoard.width),
        Math.floor(Math.random() * gameBoard.height)
      )}
  >
    Добавить
  </button>
  <h1>Действия</h1>
  <button
    on:click={() => handleActionClick("damage")}
    class:active={activeAction === "damage"}
  >
    Нанести урон
  </button>
  <button
    on:click={() => handleActionClick("heal")}
    class:active={activeAction === "heal"}
  >
    Лечение
  </button>

  <button
    on:click={() => handleActionClick("move")}
    class:active={activeAction === "move"}
  >
    Передвинуть
  </button>

  <h1>Игрок:</h1>
  <p>{player.name}, {player.type}, {player.hp}</p>
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
