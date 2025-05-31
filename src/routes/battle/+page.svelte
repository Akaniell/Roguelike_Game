<script lang="ts">
  import CellInfo from "$lib/components/CellInfo.svelte";
  import GameBoard from "$lib/components/GameBoard.svelte";
  import PlayerInfo from "$lib/components/PlayerInfo.svelte";
  import SpellPanel from "$lib/components/SpellPanel.svelte";
  import "$lib/utils/gameController.ts";
</script>

<div class="page-container">
  <div class="battle-container">
    <aside class="info-container">
      <div class="player-info">
        <PlayerInfo />
      </div>
      <div class="cell-info">
        <CellInfo />
      </div>
    </aside>

    <main class="gameboard-container">
      <GameBoard />
    </main>
  </div>

  <section class="spell-container">
    <SpellPanel />
  </section>
</div>

<style>
  .page-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .battle-container {
    margin: 5px;
    width: 100%;
    height: 75%;
    display: flex;
    justify-content: space-between;
  }

  .spell-container {
    height: 25%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .gameboard-container {
    margin-right: 5px;
    margin-top: 5px;
    width: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .info-container {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .info-container > div {
    flex: 1;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
  }
</style>
