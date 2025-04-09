<script lang="ts">
  import {
    playerStore,
    enemiesStore,
    gameBoardStore,
  } from "$lib/Stores/localstorage";
  import type { Enemy, GameBoard, Player } from "$lib/Stores/localstorage";
  import { addEnemy, movePlayerToBoard, placeEntityOnBoard, removeEnemy } from "$lib/utils/gameUtils";

  let player: Player;
  let enemies: Enemy[];
  let gameBoard: GameBoard;

  let enemyName = "";
  let enemyPosition = { x: 0, y: 0 };

  $: playerStore.subscribe((value) => (player = value));
  $: enemiesStore.subscribe((value) => (enemies = value));
  $: gameBoardStore.subscribe((value) => (gameBoard = value));

  function movePlayer(x: number, y: number) {
    playerStore.update((player) => {
      player.position = { x, y };
      return player;
    });
  }

  function createEnemy() {
    addEnemy(enemyName, enemyPosition);
    enemyName = ""; // Сброс имени после создания
    enemyPosition = { x: 0, y: 0 }; // Сброс позиции после создания
  }

  function deleteEnemy(id: number) {
    removeEnemy(id);
  }

  function placePlayerOnBoard(x: number, y: number) {
    const player = $playerStore;
    movePlayerToBoard(player, x, y);
  }
</script>

<div>
  <h1>Игрок:</h1>
  <p>
    {player.name} находится на позиции ({player.position.x},{player.position.y})
  </p>
  <button
    on:click={() => movePlayer(player.position.x + 1, player.position.y + 1)}
    >Переместить игрока</button
  >
  <h2>Создать нового врага:</h2>
  <input type="text" bind:value={enemyName} placeholder="Имя врага" />
  <input
    type="number"
    bind:value={enemyPosition.x}
    placeholder="X координата"
  />
  <input
    type="number"
    bind:value={enemyPosition.y}
    placeholder="Y координата"
  />
  <button on:click={createEnemy}>Добавить врага</button>

  <h2>Список врагов:</h2>
  <ul>
    {#each enemies as enemy (enemy.id)}
      <li>
        {enemy.name} - ({enemy.position.x}, {enemy.position.y})
        <button on:click={() => deleteEnemy(enemy.id)}>Удалить</button>
      </li>
    {/each}
  </ul>
  <h2>Игровое поле:</h2>
  {#each gameBoard.cells as row (row[0].y)}
    <div class="row">
      {#each row as cell (cell.x)}
        <div class="cell">
          {#if cell.content === "player"}
            Игрок
          {:else if cell.content === "enemy"}
            Враг
          {:else if cell.content === "building"}
            Здание
          {:else}
            Пусто
          {/if}
        </div>
      {/each}
    </div>
  {/each}
  <h1>Посадить игрока в 1.1</h1>
  <button on:click={() => placePlayerOnBoard(Math.floor(Math.random()*(6-0+1)+0),Math.floor(Math.random()*(4-0+1)+0))}>Добавить</button>
</div>

<style>
  .row {
    display: flex;
  }

  .cell {
    width: 70px;
    height: 70px;
    border: 1px solid black;
    text-align: center;
    padding: 5px;
  }
</style>
