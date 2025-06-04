<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  import { playerStore } from "$lib/Stores/playerStore";
  import { currentWaveStore, gameBoardStore } from "$lib/Stores/gameBoardStore";
  import { enemiesStore } from "$lib/Stores/enemiesStore";
  import { goto } from "$app/navigation";
  import {
    defaultEnemies,
    defaultGameBoard,
    defaultPlayer,
  } from "$lib/data/initialValue";
  import { spawnWave } from "$lib/utils/gameController";
  import { shopStore } from "$lib/Stores/shopStore";
  import { shopTemplates } from "$lib/data/shopTemplates";

  let canContinue = false;

  onMount(() => {
    if (browser) {
      if(localStorage.getItem("player"))
        canContinue = JSON.parse(localStorage.getItem("player") as string).hp > '0' && localStorage.getItem("currentWave") !== '0';
    }
  });

  function startNewGame(event: MouseEvent) {
    event.preventDefault();
    if (browser) {
      playerStore.set(defaultPlayer);
      enemiesStore.set(defaultEnemies);
      gameBoardStore.set(defaultGameBoard);
      shopStore.set(shopTemplates);
      currentWaveStore.set(1);
      spawnWave(1);
      goto("/intro");
    }
  }

  function continueGame(event: MouseEvent) {
    event.preventDefault();
    if (!canContinue) return;
    goto("/battle");
  }
</script>

<div class="start-screen">
  <button
    class="nav-link"
    on:click={continueGame}
    disabled={!canContinue}
    aria-disabled={!canContinue}
  >
    Продолжить
  </button>

  <button class="nav-link" on:click={startNewGame}> Начать новую игру </button>
</div>

<style>
  .start-screen {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background: url("/img/start-screen-bg.png") no-repeat center center;
    background-size: cover;
  }

  .nav-link {
    width: 350px;
    cursor: pointer;
    font-family: "Press Start 2P", cursive, monospace;
    font-size: 24px;
    color: #f5f5f5;
    background: #2c2c2c;
    border: 2px solid #2c2c2c;
    box-shadow: 4px 4px 0 #000;
    text-shadow: 1px 1px 0 #000;
    user-select: none;
    padding: 0.5rem 1rem;
    transition:
      background-color 0.1s ease,
      border-color 0.1s ease;
  }

  .nav-link:hover:not(:disabled) {
    background: #3a3a3a;
    border-color: #3a3a3a;
  }

  .nav-link:active:not(:disabled) {
    background: #1e1e1e;
    border-color: #1e1e1e;
    box-shadow: inset 2px 2px 0 #000;
  }

  .nav-link:disabled,
  .nav-link[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
