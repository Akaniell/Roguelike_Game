<script lang="ts">
  import type { Cell } from "$lib/Stores/types";
  import { getEntityInfo } from "$lib/utils/gameUtils";

  export let cell: Cell;
  export let onClick: (cell: Cell) => void;

  $: entityInfo = getEntityInfo(cell.x, cell.y);
</script>

<button class="cell" on:click={() => onClick(cell)}>
  {#if entityInfo.entity}
    {entityInfo.entity.name}
  {:else}
    {cell.content}
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
