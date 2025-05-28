<script lang="ts">
  import GameBoard from "$lib/components/GameBoard.svelte";
</script>

<div>
  <div class="battle-container">
    <div class="info-container">a</div>
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
    padding-right: 5px;
    width: 75%;
  }
  .info-container{
    width: 25%;
  }
</style>
