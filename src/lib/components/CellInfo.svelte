<script lang="ts">
  import { currentCellStore } from "$lib/Stores/currentCellStore";
  import { currentWaveStore } from "$lib/Stores/gameBoardStore";
  import { derived } from "svelte/store";
</script>

{#if $currentCellStore}
  <div class="cell-info">
    <div class="header">
      {#if $currentCellStore.entity?.image}
        <img
          src={$currentCellStore.entity.image}
          alt={$currentCellStore.entity.name}
          class="avatar"
        />
      {/if}
      <div class="title">
        <div class="name">
          {$currentCellStore.entity?.name ?? "Пустая клетка"}
        </div>
      </div>
    </div>

    {#if $currentCellStore.entity}
      <div class="hp-row">
        <span class="label">Здоровье:</span>
        <span class="hp-text">{$currentCellStore.entity.hp}/{$currentCellStore.entity.maxHp}</span>
      </div>

      {#if $currentCellStore.entity.type === "player" && "coins" in $currentCellStore.entity}
        <div class="stat-row">
          <span class="label">Монеты:</span>
          <span>{$currentCellStore.entity.coins}</span>
          <img src="/img/coin.gif" alt="Монета" class="coin-gif" />
        </div>
      {/if}

      {#if $currentCellStore.entity.type === "enemy" && "coinsReward" in $currentCellStore.entity}
        <div class="stat-row">
          <span class="label">Награда:</span>
          <span>{$currentCellStore.entity.coinsReward}</span>
          <img src="/img/coin.gif" alt="Монета" class="coin-gif" />
        </div>
      {/if}

      {#if $currentCellStore.entity?.type === "enemy" && "attackDamage" in $currentCellStore.entity}
        <div class="stat-row">
          <span class="label">Наносимый урон:</span>
          <span>{$currentCellStore.entity.attackDamage}</span>
        </div>
      {/if}

      {#if $currentCellStore.entity?.type === "enemy" && "attackRange" in $currentCellStore.entity}
        <div class="stat-row">
          <span class="label">Радиус атаки:</span>
          <span>{$currentCellStore.entity.attackRange}</span>
        </div>
      {/if}

      {#if $currentCellStore.entity?.type === "building" && "createdWave" in $currentCellStore.entity}
        <div class="stat-row">
          <span class="label">Волна создания:</span>
          <span>{$currentCellStore.entity.createdWave}</span>
        </div>
      {/if}
    {:else}
      <div>Пустая клетка</div>
    {/if}
  </div>
{:else}
  <div class="cell-info empty">
    Наведи курсор на клетку, чтобы увидеть информацию
  </div>
{/if}

<style>
  .cell-info {
    color: var(--color-button-text);
    padding: 1rem;
    border-radius: 10px;
    font-size: 0.9rem;
    min-width: 270px;
    text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1rem;
  }
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    border: 2px solid #444;
    background: #111;
    object-fit: cover;
  }
  .title {
    display: flex;
    flex-direction: column;
  }
  .name {
    font-size: 1.1rem;
    color: var(--color-button-text);
    text-shadow: 1px 1px 0 #000;
  }
  .hp-row,
  .stat-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .label {
    min-width: 85px;
    color: var(--color-button-text);
    text-shadow: 1px 1px 0 #000;
  }
  .hp-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    color: var(--color-button-text);
    text-shadow: 0 0 3px #000;
    pointer-events: none;
    user-select: none;
  }
  .coin-gif {
    width: 16px;
    height: 16px;
    object-fit: contain;
    margin-left: 4px;
  }
</style>
