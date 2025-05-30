<script lang="ts">
  import { onMount} from "svelte";
  import { browser } from "$app/environment";

  import { playerStore } from "$lib/Stores/playerStore";
  import { currentWaveStore, gameBoardStore } from "$lib/Stores/gameBoardStore";
  import { enemiesStore } from "$lib/Stores/enemiesStore";
  import { goto } from "$app/navigation";
  import { defaultEnemies, defaultGameBoard, defaultPlayer } from "$lib/data/initialValue";
  import { spawnWave } from "$lib/utils/gameController";

  let canContinue = false;

  onMount(() => {
    if (browser) {
      canContinue = !!localStorage.getItem("player"); // замени на свой ключ, если нужно
    }
  });

  function startNewGame(event: MouseEvent) {
    event.preventDefault();
    if (browser) {
      // Удаляем ключи из localStorage, если нужно
      playerStore.set(defaultPlayer);
      enemiesStore.set(defaultEnemies);
      gameBoardStore.set(defaultGameBoard);
      currentWaveStore.set(1);
      spawnWave(1);
      goto("/intro");
    }
  }

  function continueGame(event: MouseEvent) {
    event.preventDefault();
    goto("/battle");
  }
</script>

<div class="start-screen">
  <a
    href="/battle"
    class="nav-link"
    on:click={continueGame}
    aria-disabled={!canContinue}
    tabindex={canContinue ? 0 : -1}>Продолжить</a
  >
  <a href="/intro" class="nav-link" on:click={startNewGame}>Начать новую игру</a
  >
</div>

<style>
  .start-screen {
    min-height: 100%;
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
  }
</style>
