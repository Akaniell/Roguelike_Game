<script lang="ts">
  import { playerStore } from "$lib/Stores/playerStore";
  import { selectedElements, selectedSpellName } from "$lib/Stores/spellStore";
  import { spellCombinations } from "$lib/data/spellTemplates";
  import SpellTooltip from "./SpellTooltip.svelte";

  const allElements = ["Огонь", "Вода", "Земля", "Воздух"];

  const elementIcons: Record<string, string> = {
    Земля: "/img/elements/earth.png",
    Огонь: "/img/elements/fire.png",
    Вода: "/img/elements/water.png",
    Воздух: "/img/elements/air.png",
  };

  $: currentChosenElements = $playerStore?.elements ?? [];
  $: unlockedSlotsCount = $playerStore?.unlockedSlotsCount ?? 2;
  $: currentTurnElements = $selectedElements;

  $: currentSpell = getSpellByElements(currentTurnElements);

  let showTooltip = false;

  function getSpellByElements(elements: string[]) {
    if (elements.length !== 2) return undefined;
    const sorted = [...elements].sort();
    return spellCombinations.find((spell) => {
      const combSorted = [...spell.elements].sort();
      return combSorted[0] === sorted[0] && combSorted[1] === sorted[1];
    });
  }

  function addElement(el: string) {
    if (currentTurnElements.length >= unlockedSlotsCount) return;
    selectedElements.update((arr) => [...arr, el]);
  }

  function removeElement(index: number) {
    selectedElements.update((arr) => arr.filter((_, i) => i !== index));
  }

  function onResultClick() {
    if (currentSpell) {
      selectedSpellName.set(currentSpell.spellName);
    }
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
      aria-label={currentSpell?.description ?? "Выберите стихии"}
      on:click={onResultClick}
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
        <img src={elementIcons[el]} alt={el} class="element-icon" />
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
    font-family: var(--font-main);
    font-size: 1rem;
    color: var(--color-button-text);
    gap: 8px;
  }

  .slot {
    all: unset;
    min-width: 80px;
    height: 40px;
    background-color: var(--color-button-bg);
    border: 2px solid var(--color-button-bg);
    padding: 0 5px;
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
    background-color: var(--color-button-bg-active);
    border-color: var(--color-button-bg-active);
    color: #555;
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
    background-color: var(--color-button-bg-hover);
    border-color: var(--color-button-bg-hover);
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
    background: var(--color-button-bg);
    border: 2px solid var(--color-button-bg);
    border-radius: 6px;
    color: var(--color-button-text);
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

  .result-slot:disabled {
    background-color: var(--color-button-bg-active);
    border-color: var(--color-button-bg-active);
    color: #555;
    cursor: not-allowed;
  }

  .result-slot:not(:disabled):hover {
    background-color: var(--color-button-bg-hover);
    border-color: var(--color-button-bg-hover);
  }

  .buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .element-button {
    padding: 10px 16px;
    font-size: 0.85rem;
    background-color: var(--color-button-bg);
    border: 2px solid var(--color-button-bg);
    border-radius: 6px;
    color: var(--color-button-text);
    cursor: pointer;
    user-select: none;
    transition:
      background-color 0.2s,
      border-color 0.2s;
  }

  .element-button:disabled {
    background-color: var(--color-button-bg-active);
    border-color: var(--color-button-bg-active);
    color: #555;
    cursor: not-allowed;
  }

  .element-button:not(:disabled):hover {
    background-color: var(--color-button-bg-hover);
    border-color: var(--color-button-bg-hover);
  }

  .element-icon {
    width: auto;
    height: 24px;
    margin-right: 6px;
    vertical-align: middle;
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.7));
  }
</style>
