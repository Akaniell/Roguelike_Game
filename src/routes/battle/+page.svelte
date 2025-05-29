<script lang="ts">
  import GameBoard from "$lib/components/GameBoard.svelte";
  import PlayerInfo from "$lib/components/PlayerInfo.svelte";
</script>

<div>
  <div class="battle-container">
    <div class="info-container">
      <PlayerInfo></PlayerInfo>
    </div>
    <div class="gameboard-container">
      <GameBoard></GameBoard>
    </div>
  </div>
  <div class="spell-container">
    a
  </div>
</div>

<style>
  .battle-container {
    width: 100%;
    height: 75%;
    display: flex;
    justify-content: space-between;
  }
  .spell-container{
    height: 25%;
    width: 100%;
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
    margin-left: 5px;
    margin-top: 5px;
    width: 25%;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
  }
</style>
