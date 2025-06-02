<script lang="ts">
  import { currentWaveStore } from "$lib/Stores/gameBoardStore";
  import { playerStore } from "$lib/Stores/playerStore";

  $: hpPercent =
    $playerStore && $playerStore.maxHp
      ? Math.max(0, Math.min(100, ($playerStore.hp / $playerStore.maxHp) * 100))
      : 0;

  $: effects = $playerStore?.effects ?? [];
</script>

<div class="player-info">
  <div class="player-header">
    <img class="avatar" src={$playerStore?.image} alt="Аватар" />
    <div>
      <div class="player-name">{$playerStore?.name}</div>
      <div class="player-elements">
        {#each $playerStore?.elements ?? [] as el}
          <span class="element">{el}</span>
        {/each}
      </div>
    </div>
  </div>
  <div class="player-stats">
    <div class="stat-row">
      <span class="stat-label">Здоровье:</span>
      <span class="hp-bar">
        <span class="hp-fill" style="width: {hpPercent}%;"></span>
        <span class="hp-text">{$playerStore?.hp} / {$playerStore?.maxHp}</span>
      </span>
    </div>
    <div class="stat-row">
      <span class="stat-label">Монеты:</span>
      <span class="coin-value">{$playerStore?.coins}</span>
      <img src="/img/coin.gif" alt="Монета" class="coin-gif" />
    </div>
    <div class="stat-row">
      <span class="stat-label">Волна:</span>
      <span class="">{$currentWaveStore}</span>
    </div>
  </div>
  <div class="player-effects">
    <span class="stat-label">Эффекты:</span>
    {#if effects.length === 0}
      <span class="no-effects">Нет</span>
    {:else}
      <div class="effects-list">
        {#each effects as eff}
          <div class="effect" title={eff.description}>
            {#if eff.icon}
              <img src={eff.icon} alt={eff.name} class="effect-icon" />
            {/if}
            <span>{eff.name}</span>
            {#if eff.duration !== undefined}
              <span class="effect-duration">({eff.duration})</span>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .player-info {
    color: var(--color-button-text);
    padding: 1.2rem 1rem 1rem 1rem;
    border-radius: 10px;
    font-size: 1rem;
  }
  .player-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.2rem;
    gap: 0.8rem;
  }
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    border: 2px solid #444;
    background: #111;
    object-fit: cover;
  }
  .player-name {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
    letter-spacing: 1px;
    color: var(--color-button-text);
    text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
  }
  .player-elements {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }
  .player-elements .element {
    display: inline-block;
    background: #444;
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.85rem;
    color: #ffb;
    border: 1px solid #222;
    text-shadow: 1px 1px 0 #000;
  }
  .player-stats {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }
  .stat-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 22px;
  }
  .stat-label {
    min-width: 85px;
    color: var(--color-button-text);
    text-shadow: 1px 1px 0 #000;
    font-size: 0.95em;
    text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
  }
  .hp-bar {
    position: relative;
    width: 120px;
    height: 20px;
    background: #333;
    border: 2px solid #555;
    border-radius: 5px;
    overflow: hidden;
    box-sizing: border-box;
    box-shadow: inset 0 0 5px #000;
  }
  .hp-fill {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #81c784);
    transition: width 0.3s ease;
    border-radius: 3px 0 0 3px;
    width: 0;
  }
  .hp-text {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    color: var(--color-button-text);
    text-shadow: 0 0 3px #000;
    pointer-events: none;
    user-select: none;
    text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
  }
  .coin-value {
    min-width: 16px;
    text-align: right;
    color: var(--color-button-text);
    text-shadow: 1px 1px 0 #000;
    text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
  }
  .coin-gif {
    width: 16px;
    height: 16px;
    object-fit: contain;
    display: block;
    margin-left: 2px;
    image-rendering: pixelated;
  }
  .player-effects {
    margin-top: 0.5rem;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .no-effects {
    color: #888;
    font-size: 0.95em;
    margin-left: 0.3rem;
  }
  .effects-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0;
  }
  .effect {
    display: flex;
    align-items: center;
    background: #333;
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.9rem;
    color: #bff;
    border: 1px solid #222;
    cursor: help;
    text-shadow: 1px 1px 0 #000;
  }
  .effect-icon {
    width: 18px;
    height: 18px;
    margin-right: 0.3rem;
    border-radius: 3px;
    background: #222;
    image-rendering: pixelated;
  }
  .effect-duration {
    margin-left: 0.3rem;
    color: #fa0;
    font-size: 0.85em;
  }
</style>
