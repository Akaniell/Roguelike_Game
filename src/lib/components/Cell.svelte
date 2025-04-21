<script lang="ts">
  import Tooltip from "./Tooltip.svelte";
  import type { Cell } from "$lib/Stores/types";

  export let cell: Cell;
  export let onClick: (cell: Cell) => void;

  let showTooltip = false;
  let tooltipPosition = { top: 0, left: 0 };

  const typeNames: Record<string, string> = {
    player: "Игрок",
    enemy: "Враг",
    building: "Здание",
    empty: "Пусто",
  };

  $: tooltipContent = `
    <div><strong>Тип:</strong> ${typeNames[cell.content] || cell.content}</div>
    ${
      cell.entity
        ? `
      <div><strong>Имя:</strong> ${cell.entity.name}</div>
      <div><strong>HP:</strong> ${cell.entity.hp}</div>
      ${cell.entity.type === "enemy" ? `<div><strong>Награда:</strong> ${(cell.entity as any).coinsReward || 0} монет</div>` : ""}
    `
        : ""
    }
  `;

  function handleMouseMove(event: MouseEvent) {
    tooltipPosition = {
      top: event.clientY + 15, // смещение по вертикали от курсора
      left: event.clientX + 15, // смещение по горизонтали от курсора
    };
  }

  function show() {
    showTooltip = true;
  }

  function hide() {
    showTooltip = false;
  }
</script>

<button
  class="cell"
  on:click={() => onClick(cell)}
  on:mouseenter={show}
  on:mouseleave={hide}
  on:mousemove={handleMouseMove}
  type="button"
>
  {#if cell.entity}
    {cell.entity.name}
  {:else}
    Пусто
  {/if}

  <Tooltip
    visible={showTooltip}
    content={tooltipContent}
    position={tooltipPosition}
  />
</button>

<style>
  button.cell {
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
</style>
