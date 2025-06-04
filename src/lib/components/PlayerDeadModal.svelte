<script lang="ts">
  import { isPlayerDead } from "$lib/utils/gameController";
  import { goto } from "$app/navigation";

  function restartGame() {
    isPlayerDead.set(false);
    goto("/");
  }
</script>

{#if $isPlayerDead}
  <div class="overlay">
    <div class="modal">
      <p class="title">Поражение — это не конец!</p>
      <p>
        Каждая неудача приближает вас к победе. Соберитесь с силами и начните
        заново!
      </p>
      <button on:click={restartGame}>Начать заново</button>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background: #222;
    padding: 2rem;
    border-radius: 8px;
    color: white;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 0 10px #000;
  }

  .title {
    font-size: 2rem; 
    margin: 0 0 1rem 0; 
    text-shadow:
      -2px -2px 0 #000,
      2px -2px 0 #000,
      -2px 2px 0 #000,
      2px 2px 0 #000;
  }

  .modal p:not(.title) {
    margin: 1rem 0;
    line-height: 1.4;
    text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
  }

  button {
    margin-top: 1.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #ff5555;
    color: white;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #ff2222;
  }
</style>
