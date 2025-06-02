<script lang="ts">
  import { currentCellStore } from "$lib/Stores/currentCellStore";
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

  let filter = filters[Math.floor(Math.random() * filters.length)];

  $: hpPercent =
    cell.entity && cell.entity.maxHp
      ? Math.max(0, Math.min(100, (cell.entity.hp / cell.entity.maxHp) * 100))
      : 0;
</script>

<button
  class="cell"
  on:click={() => onClick(cell)}
  on:mouseenter={() => currentCellStore.set(cell)}
  on:mouseleave={() => currentCellStore.set(null)}
  type="button"
  style="filter: {filter}; background-image: url('/img/cell-bg.png')"
>
  {#if cell.entity}
    {#key cell.entity.id}
      <div class="hp-bar-container" aria-label="Здоровье сущности">
        <div class="hp-bar-fill" style="width: {hpPercent}%"></div>
      </div>

      {#if cell.entity.image}
        <img
          src={cell.entity.image}
          alt={cell.entity.name}
          class="entity-image"
        />
      {:else}
        <span>{cell.entity.name}</span>
      {/if}
    {/key}
  {/if}
</button>

<style>
  button.cell {
    position: relative;
    width: 80px;
    height: 80px;
    box-shadow: inset 2px 2px 0 var(--color-cell-shadow, #555);
    font-size: 10px;
    outline: none;
    padding-top: 12px;
    box-sizing: border-box;
  }
  button.cell:active {
    background: var(--color-button-bg-active);
    border-color: var(--color-cell-border-active, #999);
    box-shadow: inset 1px 1px 0 var(--color-cell-shadow-active, #222);
  }
  .entity-image {
    max-width: 90%;
    max-height: 90%;
    display: block;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }
  .hp-bar-container {
    position: absolute;
    top: 4px;
    left: 6px;
    right: 6px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    overflow: hidden;
    box-shadow: inset 0 0 3px #000;
    z-index: 10;
  }

  .hp-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #81c784);
    transition: width 0.3s ease;
    border-radius: 4px 0 0 4px;
  }
</style>
