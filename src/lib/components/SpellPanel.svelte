<script lang="ts">
  import { playerStore } from "$lib/Stores/playerStore";
  import type { Player } from "$lib/Stores/types";
  import { derived } from "svelte/store";
  import { onDestroy } from "svelte";
  import type { SpellCombination } from "$lib/Stores/types";
  import { spellCombinations } from "$lib/data/spellTemplates";
  import SpellTooltip from "./SpellTooltip.svelte";
  import { selectedElements, selectedSpellName } from "$lib/Stores/spellStore";

  const allElements = ["Огонь", "Вода", "Земля", "Воздух"];

  const playerData = derived(playerStore, ($player: Player | null) => $player);

  let currentChosenElements: string[] = [];
  let currentTurnElements: string[] = [];
  let unlockedSlotsCount = 2;

  const unsubscribePlayer = playerData.subscribe((player) => {
    if (player) {
      currentChosenElements = player.elements ?? [];
      unlockedSlotsCount = player.unlockedSlotsCount ?? 2;
    }
  });
  onDestroy(() => unsubscribePlayer());


  let unsubscribe = selectedElements.subscribe((value) => {
    currentTurnElements = value;
  });

  onDestroy(() => {
    unsubscribe();
  });

  function addElement(el: string) {
    if (currentTurnElements.length >= unlockedSlotsCount) return;
    selectedElements.update((arr) => [...arr, el]);
  }

  function removeElement(index: number) {
    selectedElements.update((arr) => arr.filter((_, i) => i !== index));
  }

  $: currentSpell = getSpellByElements(currentTurnElements);

  function getSpellByElements(
    elements: string[]
  ): SpellCombination | undefined {
    if (elements.length !== 2) return undefined;
    const sorted = [...elements].sort();
    return spellCombinations.find((spell) => {
      const combSorted = [...spell.elements].sort();
      return combSorted[0] === sorted[0] && combSorted[1] === sorted[1];
    });
  }

  let showTooltip = false;

  function onResultClick() {
    const spell = currentSpell;
    if (!spell) return;

    selectedSpellName.set(spell.spellName);
  }
</script>

<div class="spell-panel">
  <div class="slots">
    {#each [0, 1, 2, 3] as i}
      <button
        type="button"
        class="slot"
        disabled={i >= unlockedSlotsCount}
        on:click={() => {
          if (i >= unlockedSlotsCount) return;
          if (currentTurnElements[i]) removeElement(i);
        }}
        title={i >= unlockedSlotsCount
          ? "Слот заблокирован"
          : currentTurnElements[i]
            ? "Кликните, чтобы убрать стихию"
            : ""}
      >
        {#if i < currentTurnElements.length}
          <span class="slot-element">{currentTurnElements[i]}</span>
        {:else}
          <span class="slot-placeholder">_</span>
        {/if}
      </button>

      {#if i < 3}
        <div class="plus">+</div>
      {/if}
    {/each}

    <div class="equals">=</div>

    <button
      type="button"
      class="result-slot"
      on:mouseenter={() => (showTooltip = true)}
      on:mouseleave={() => (showTooltip = false)}
      aria-label={currentSpell?.description ?? "Выберите 2 стихии"}
      on:click={() => {
        onResultClick();
      }}
      disabled={!currentSpell}
    >
      {#if currentSpell}
        {currentSpell.spellName}
      {:else}
        ?
      {/if}

      {#if showTooltip}
        <SpellTooltip spell={currentSpell} />
      {/if}
    </button>
  </div>

  <div class="buttons">
    {#each allElements as el}
      <button
        class="element-button"
        disabled={!currentChosenElements.includes(el) ||
          currentTurnElements.length >= unlockedSlotsCount}
        on:click={() => addElement(el)}
        title={el}
      >
        {el}
      </button>
    {/each}
  </div>
</div>

<style>
  .spell-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 10px;
  }

  .slots {
    display: flex;
    align-items: center;
    font-family: "Press Start 2P", monospace;
    font-size: 1rem;
    color: #eee;
    gap: 8px;
  }

  .slot {
    all: unset;
    min-width: 80px;
    height: 40px;
    background-color: #444;
    border: 2px solid #666;
    padding: 0px 5px;
    border-radius: 6px;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    text-align: center;
    transition:
      background-color 0.2s,
      border-color 0.2s;
  }

  .slot:disabled {
    background-color: #111;
    border-color: #222;
    color: #444;
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: inset 0 0 8px 2px rgba(0, 0, 0, 0.7);
  }

  .slot:disabled::after {
    content: "🔒";
    position: absolute;
    top: 4px;
    right: 6px;
    font-size: 1rem;
    color: #666;
    pointer-events: none;
  }

  .slot:hover:not(:disabled) {
    background-color: #666;
    border-color: #aaa;
  }

  .slot-element {
    pointer-events: none;
  }

  .slot-placeholder {
    color: #555;
  }

  .plus,
  .equals {
    font-weight: bold;
    font-size: 1.5rem;
    user-select: none;
    color: #aaa;
    margin: 0 6px;
  }

  .result-slot {
    all: unset;
    box-sizing: border-box;
    position: relative;
    min-width: 200px;
    height: 40px;
    background: #222;
    border: 2px solid #666;
    border-radius: 6px;
    color: #eee;
    padding: 6px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
  }

  .result-slot > :global(div) {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 6px;
    z-index: 10;
  }

  .buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .element-button {
    width: auto;
    height: auto;
    padding: 10px 16px;
    font-size: 0.85rem;
    background-color: #444;
    border-color: #666;
    border-radius: 6px;
    box-shadow: none;
    text-shadow: none;
    transition:
      background-color 0.2s,
      border-color 0.2s;
    color: #eee;
    cursor: pointer;
    user-select: none;
  }

  .element-button:disabled,
  .result-slot:disabled {
    background-color: #222;
    border-color: #333;
    color: #555;
    cursor: not-allowed;
  }

  .element-button:not(:disabled):hover,
  .result-slot:not(:disabled):hover {
    background-color: #666;
    border-color: #aaa;
  }
</style>
