<script lang="ts">
  import {
    gameBoardStore,
    playerStore,
    type GameBoard,
    type Player,
  } from "$lib/Stores/localstorage";
  import {
    applyDamageToCell,
    applyHealToCell,
    movePlayerToBoard,
  } from "$lib/utils/gameUtils";
  import { onMount } from "svelte";
  import Cell from "./Cell.svelte";

  let gameBoard: GameBoard;
  let player: Player;
  $: gameBoardStore.subscribe((value) => (gameBoard = value));
  $: playerStore.subscribe((value) => (player = value));

  let selectedCell: Cell | null = null;
  let activeAction: string | null = null;
  let firstCell: Cell | null = null;

  function handleCellClick(cell: Cell) {
    switch (activeAction) {
      case "move":
        if (!firstCell) {
          firstCell = cell;
        } else {
          swapEntities(firstCell, cell);
          firstCell = null;
          activeAction = null;
        }
        break;
      case "damage":
        applyDamageToCell(cell.x, cell.y, 1);
        activeAction = null;
        break;
      case "heal":
        applyHealToCell(cell.x, cell.y, 1);
        activeAction = null;
        break;
      default:
        selectedCell = cell;
    }
  }

  function swapEntities(cell1: Cell, cell2: Cell) {
    gameBoardStore.update((board) => {
      const temp = board.cells[cell1.y][cell1.x].content;
      board.cells[cell1.y][cell1.x].content =
        board.cells[cell2.y][cell2.x].content;
      board.cells[cell2.y][cell2.x].content = temp;

      const tempEntity = board.cells[cell1.y][cell1.x].entity;
      board.cells[cell1.y][cell1.x].entity =
        board.cells[cell2.y][cell2.x].entity;
      board.cells[cell2.y][cell2.x].entity = tempEntity;

      return board;
    });
  }

  function placePlayerOnBoard(x: number, y: number) {
    const player: Player = $playerStore;
    movePlayerToBoard(player, x, y);
  }

  function handleActionClick(action: string) {
    activeAction = action;
    selectedCell = null;
  }
</script>

<div class="gameboard">
  {#each gameBoard.cells as row (row[0].y)}
    <div class="row">
      {#each row as cell (cell.x)}
        <Cell cell={cell} onClick={handleCellClick} entity={cell.entity} />
      {/each}
    </div>
  {/each}

  <h1>Посадить игрока в Случайную клетку</h1>
  <button
    on:click={() =>
      placePlayerOnBoard(
        Math.floor(Math.random() * (6 - 0 + 1) + 0),
        Math.floor(Math.random() * (4 - 0 + 1) + 0)
      )}>Добавить</button
  >
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
