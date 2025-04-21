<script lang="ts">
  import Tooltip from "./Tooltip.svelte";
  import type { Cell } from "$lib/Stores/types";
  import { onMount } from "svelte";

  export let cell: Cell;
  export let onClick: (cell: Cell) => void;

  let showTooltip = false;
  let tooltipPosition = { top: 0, left: 0 };
  let cellElement: HTMLElement;

  const typeNames: Record<string, string> = {
    player: "Игрок",
    enemy: "Враг",
    building: "Здание",
    empty: "Пусто",
  };

  $: tooltipContent = `
    <div><strong>Тип:</strong> ${typeNames[cell.content] || cell.content}</div>
    ${cell.entity ? `
      <div><strong>Имя:</strong> ${cell.entity.name}</div>
      <div><strong>HP:</strong> ${cell.entity.hp}</div>
      ${cell.entity.type === 'enemy' ? `<div><strong>Награда:</strong> ${(cell.entity as any).coinsReward || 0} монет</div>` : ''}
    ` : ''}
  `;

  function show() {
    showTooltip = true;
    updateTooltipPosition();
  }

  function hide() {
    showTooltip = false;
  }

  function updateTooltipPosition() {
    if (!cellElement) return;
    const rect = cellElement.getBoundingClientRect();
    tooltipPosition = {
      top: rect.top + window.scrollY - 10,
      left: rect.right + window.scrollX + 10,
    };
  }

  onMount(() => {
    window.addEventListener("scroll", updateTooltipPosition);
    window.addEventListener("resize", updateTooltipPosition);
    return () => {
      window.removeEventListener("scroll", updateTooltipPosition);
      window.removeEventListener("resize", updateTooltipPosition);
    };
  });
</script>

<button
  bind:this={cellElement}
  class="cell"
  on:click={() => onClick(cell)}
  on:mouseenter={show}
  on:mouseleave={hide}
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
    width: 90px;
    height: 90px;
    background: #747474;
    border: 2px solid #333;
    box-shadow: inset 2px 2px 0 #555;
    font-family: 'Press Start 2P', cursive;
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