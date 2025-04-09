<script lang="ts">
  import { gameBoardStore } from "$lib/Stores/localstorage";
  import { addEnemy, placeEntityOnBoard } from "$lib/utils/gameUtils";
  import { onMount } from "svelte";

  let name: string = "";
  let hp: number = 10;
  let x: number = 0;
  let y: number = 0;
  let gameBoardWidth: number = 0;
  let gameBoardHeight: number = 0;

  onMount(() => {
    gameBoardStore.subscribe((board) => {
      gameBoardWidth = board.width;
      gameBoardHeight = board.height;
    });
  });

  function createEnemy() {
    addEnemy(name, hp);
    // Get the last enemy ID (assuming it's the one we just added)
    // Place the enemy on the board at the specified coordinates
    placeEnemyOnBoard();
    name = "";
    hp = 10;
  }

  function placeEnemyOnBoard() {
    const enemy = {
      id: Date.now(),
      name: name,
      type: "enemy" as "player" | "enemy" | "building",
      hp: hp,
    };
    placeEntityOnBoard(enemy, x, y);
  }
</script>

<div>
  <h2>Создать врага</h2>
  <label for="name">Имя:</label>
  <input type="text" id="name" bind:value={name} />

  <label for="hp">HP:</label>
  <input type="number" id="hp" bind:value={hp} />

  <label for="x">X:</label>
  <input type="number" id="x" bind:value={x} min="0" max={gameBoardWidth - 1} />

  <label for="y">Y:</label>
  <input
    type="number"
    id="y"
    bind:value={y}
    min="0"
    max={gameBoardHeight - 1}
  />

  <button on:click={createEnemy}>Создать и разместить врага</button>
</div>

<style>
      div {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    width: 300px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
  }
</style>
