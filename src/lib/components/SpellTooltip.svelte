<script lang="ts">
  import type { SpellCombination } from "$lib/Stores/types";

  export let spell: SpellCombination | null = null;
</script>

{#if spell}
  <div class="tooltip">
    <div class="spell-name">{spell.spellName}</div>
    <div class="spell-description">{spell.description}</div>
    {#if spell.damage}
      <div>Урон: {spell.damage}</div>
    {/if}
    {#if spell.effect}
      <div>Эффект: {spell.effect}</div>
    {/if}
  </div>
{:else}
  <div class="tooltip">Выберите 2 стихии</div>
{/if}

<style>
  .tooltip {
    background: #222;
    /* width: 500px; */
    min-width: 200px;
    max-width: 400px;
    border: 1px solid #666;
    border-radius: 6px;
    padding: 8px;
    font-family: "Press Start 2P", monospace;
    font-size: 0.7rem;
    color: #eee;
    max-width: 220px;
    white-space: normal;
    user-select: none;
    line-height: 1.3;
  }
  .spell-name {
    font-weight: bold;
    margin-bottom: 6px;
  }
  .spell-description {
    margin-bottom: 6px;
  }
</style>
