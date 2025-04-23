<script lang="ts">
  import { enemyTemplates } from "$lib/data/enemyTemplates";
  import type { Player } from "$lib/Stores/types";
  import { addEnemyFromTemplate, addRandomEnemy } from "$lib/utils/entities/enemyUtils";
  import { movePlayerToBoard } from "$lib/utils/entities/playerUtils";

  export let activeAction: string | null;
  export let setActiveAction: (action: string | null) => void;
  export let player: Player;

  let selectedTemplateIndex = 0;

  function spawnSelectedEnemy() {
    const x = Math.floor(Math.random() * 7);
    const y = Math.floor(Math.random() * 5);
    addEnemyFromTemplate(enemyTemplates[selectedTemplateIndex], x, y);
  }

  function spawnRandomEnemy() {
    const x = Math.floor(Math.random() * 7);
    const y = Math.floor(Math.random() * 5);
    addRandomEnemy(x, y);
  }

  function placePlayerRandomly() {
    const x = Math.floor(Math.random() * 7);
    const y = Math.floor(Math.random() * 5);
    movePlayerToBoard(player, x, y);
  }

  function onActionClick(action: string) {
    if (activeAction === action) {
      setActiveAction(null);
    } else {
      setActiveAction(action);
    }
  }
</script>

<div class="debug-controls">
  <button on:click={placePlayerRandomly}>Добавить игрока</button>

  <button
    on:click={() => onActionClick("damage")}
    class:active={activeAction === "damage"}
  >
    Нанести урон
  </button>
  <button
    on:click={() => onActionClick("heal")}
    class:active={activeAction === "heal"}
  >
    Лечение
  </button>
  <button
    on:click={() => onActionClick("move")}
    class:active={activeAction === "move"}
  >
    Передвинуть
  </button>

  <p>Создание врагов</p>
  <select bind:value={selectedTemplateIndex}>
    {#each enemyTemplates as template, i}
      <option value={i}>{template.name} (HP: {template.hp})</option>
    {/each}
  </select>
  <button on:click={spawnSelectedEnemy}>Создать выбранного врага</button>
  <button on:click={spawnRandomEnemy}>Создать случайного врага</button>
</div>

<style>
  .debug-controls {
    margin-top: 20px;
  }

  button.active,
  button:active {
    background-color: #d33;
    color: white;
  }

  button {
    margin: 4px;
    padding: 6px 12px;
    cursor: pointer;
  }
</style>
