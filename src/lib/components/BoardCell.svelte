<script lang="ts">
  import Tooltip from "./Tooltip.svelte";
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

  $: filter = filters[Math.floor(Math.random() * (8)) % filters.length];

  let showTooltip = false;
  let tooltipPosition = {
    top: 0,
    left: 0,
  };
  let tooltipElement: HTMLElement | null = null;
  const OFFSET_X = 15;
  const OFFSET_Y = 15;

  const typeNames: Record<string, string> = {
    player: "Игрок",
    enemy: "Враг",
    building: "Здание",
    empty: "Пусто",
  };

  function declOfNum(number: number, titles: [string, string, string]): string {
    const cases = [2, 0, 1, 1, 1, 2];
    const n = Math.abs(number);
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 19) {
      return titles[2];
    }
    const mod10 = n % 10;
    return titles[mod10 < 5 ? cases[mod10] : cases[5]];
  }

  $: tooltipContent = `
  <div><strong>Тип:</strong> ${typeNames[cell.content] || cell.content}</div>
  ${
    cell.entity
      ? (() => {
          const coinsReward = (cell.entity as any).coinsReward || 0;
          const coinWord = declOfNum(coinsReward, [
            "монета",
            "монеты",
            "монет",
          ]);
          return `
            <div><strong>Имя:</strong> ${cell.entity.name}</div>
            <div><strong>HP:</strong> ${cell.entity.hp}</div>
            ${cell.entity.type === "enemy" ? `<div><strong>Награда:</strong> ${coinsReward} ${coinWord}</div>` : ""}
          `;
        })()
      : ""
  }
`;

  function handleMouseMove(event: MouseEvent) {
    if (!tooltipElement) return;

    const rect = tooltipElement.getBoundingClientRect();

    let left = event.clientX + OFFSET_X;
    let top = event.clientY + OFFSET_Y;

    if (left + rect.width > window.innerWidth) {
      left = event.clientX - rect.width - OFFSET_X;
      if (left < 0) left = 0;
    }

    if (top + rect.height > window.innerHeight) {
      top = window.innerHeight - rect.height;
      if (top < 0) top = 0;
    }

    tooltipPosition = {
      left,
      top,
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
  style="filter: {filter}; background-image: url('/img/cell-bg.png')"
>
  {#if cell.entity}
    {#if cell.entity?.image}
      <img
        src={cell.entity.image}
        alt={cell.entity.name}
        class="entity-image"
      />
    {:else}
      <span>{cell.entity.name}</span>
    {/if}
  {:else}
    
  {/if}

  <Tooltip
    bind:tooltipElement
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
  
  .entity-image{
    width: 100%;
    max-height: 100%;
  }
</style>
