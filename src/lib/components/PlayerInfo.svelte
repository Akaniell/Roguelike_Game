<script lang="ts">
  import { playerStore } from "$lib/Stores/playerStore";
  import type { Player } from "$lib/Stores/types";

  export let wave: number = 1;

  let player: Player;
  playerStore.subscribe((value) => (player = value));

  $: hpPercent = Math.max(0, Math.min(100, player?.hp ?? 0));

  $: effects = player?.effects ?? [];
</script>

<div class="player-info">
  <div class="player-header">
    <img class="avatar" src={player?.image} alt="Аватар" />
    <div>
      <div class="player-name">{player?.name}</div>
      <div class="player-elements">
        {#each player?.elements ?? [] as el}
          <span class="element">{el}</span>
        {/each}
      </div>
    </div>
  </div>
  <div class="player-stats">
    <div>
      <strong>Здоровье:</strong>
      <span class="hp-bar">
        <span class="hp-fill" style="width: {hpPercent}%"></span>
        <span class="hp-text">{player?.hp}</span>
      </span>
    </div>
    <div>
      <strong>Монеты:</strong>
      {player?.coins}
    </div>
    <div>
      <strong>Волна:</strong>
      {wave}
    </div>
  </div>
  <div class="player-effects">
    <strong>Эффекты:</strong>
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
    color: #eee;
    padding: 1rem;
    border-radius: 10px;
    font-size: 0.95rem;
    min-height: 180px;
  }
  .player-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .avatar {
    width: 48px;
    height: 48px;
    margin-right: 1rem;
    border-radius: 8px;
    border: 2px solid #444;
    background: #111;
    object-fit: cover;
  }
  .player-name {
    font-size: 1.15rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
  .player-elements .element {
    display: inline-block;
    background: #444;
    border-radius: 6px;
    padding: 2px 8px;
    margin-right: 0.3rem;
    font-size: 0.9rem;
  }
  .player-stats {
    margin-bottom: 1rem;
  }
  .hp-bar {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 20px;
    background: #555;
    margin: 0 0.5rem;
    vertical-align: middle;
    overflow: hidden;
  }
  .hp-fill {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #e00, #fa0);
    transition: width 0.3s;
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
    line-height: 16px;
    font-size: 0.85rem;
    color: #fff;
    text-shadow: 0 0 2px #000;
  }
  .player-effects {
    margin-top: 0.5rem;
  }
  .no-effects {
    color: #888;
    margin-left: 0.5rem;
    font-size: 0.95em;
  }
  .effects-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.3rem;
  }
  .effect {
    display: flex;
    align-items: center;
    background: #333;
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.9rem;
    cursor: help;
  }
  .effect-icon {
    width: 18px;
    height: 18px;
    margin-right: 0.3rem;
    border-radius: 3px;
    background: #222;
  }
  .effect-duration {
    margin-left: 0.3rem;
    color: #fa0;
    font-size: 0.85em;
  }
  div{
    padding-top: 10px;
  }
</style>
