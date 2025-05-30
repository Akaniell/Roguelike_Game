<script lang="ts">
  import type { Cell } from "$lib/Stores/types";

  export let cell: Cell;
  export let onClick: (cell: Cell) => void;

  const filters = [
    "brightness(0.9) contrast(1.1)",
    "brightness(1) contrast(1)",
    "brightness(1.1) contrast(0.9)",
    "brightness(1) saturate(1.2)",
    "brightness(0.95) saturate(0.8)",
    "brightness(1) hue-rotate(10deg)",
    "brightness(1) hue-rotate(-10deg)",
  ];

  $: filter = filters[Math.floor(Math.random() * filters.length)];
</script>

<button
  class="cell"
  on:click={() => onClick(cell)}
  type="button"
  style="filter: {filter}; background-image: url('/img/cell-bg.png')"
>
  {#if cell.entity}
    {#if cell.entity?.image}
      <img src={cell.entity.image} alt={cell.entity.name} class="entity-image" />
    {:else}
      <span>{cell.entity.name}</span>
    {/if}
  {/if}
</button>

<style>
  button.cell {
    position: relative;
    width: 80px;
    height: 80px;
    background: #5e5e5e;
    border: 2px solid #333;
    box-shadow: inset 2px 2px 0 #555;
    font-family: "Press Start 2P", cursive, monospace;
    font-size: 10px;
    color: #eee;
    image-rendering: pixelated;
    cursor: pointer;
    user-select: none;
  }

  button.cell:active {
    background: #555;
    border-color: #999;
    box-shadow: inset 1px 1px 0 #222;
  }

  .entity-image {
    width: 100%;
    max-height: 100%;
  }
</style>
