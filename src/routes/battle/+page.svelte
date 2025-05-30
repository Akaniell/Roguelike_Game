<script lang="ts">
  import CellInfo from "$lib/components/CellInfo.svelte";
  import GameBoard from "$lib/components/GameBoard.svelte";
  import PlayerInfo from "$lib/components/PlayerInfo.svelte";
  import SpellPanel from "$lib/components/SpellPanel.svelte";
</script>

<div style="height: 100vh">
  <div class="battle-container">
    <div class="info-container">
      <div class="player-info"><PlayerInfo></PlayerInfo></div>
      <div class="cell-info"><CellInfo></CellInfo></div>
    </div>
    <div class="gameboard-container">
      <GameBoard></GameBoard>
    </div>
  </div>
  <div class="spell-container">
    <SpellPanel></SpellPanel>
  </div>
</div>

<style>
  .battle-container {
    margin: 5px;
    width: 100%;
    height: 75%;
    display: flex;
    justify-content: space-between;
  }
  .spell-container{
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
  .info-container{
    width: 25%;
    height: 100%;
  }
  .info-container div {
    height: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
  }
</style>
