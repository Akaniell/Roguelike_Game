<script lang="ts">
  export let cell;
  export let onClick;
</script>

<button class="cell" on:click={() => onClick(cell)}>
  {#if cell.content === "player"}
    Игрок
  {:else if cell.content === "enemy"}
    Враг
  {:else if cell.content === "building"}
    Здание
  {:else}
    Пусто
  {/if}
</button>

<style>
  .cell {
    width: 50px;
    height: 50px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>
