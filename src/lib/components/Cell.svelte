<script lang="ts">
  import type { Cell, Player, Enemy, Building } from "$lib/Stores/localstorage";

  export let cell: Cell;
  export let onClick;
  export let entity: Player | Enemy | Building | null = null;
</script>

<button class="cell" on:click={() => onClick(cell)}>
  {#if entity}
    {entity.name}
  {:else}
    Пусто
  {/if}
</button>

<style>
  .cell {
    width: 70px;
    height: 70px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>
