<script lang="ts">
  import { currentCellStore } from "$lib/Stores/currentCellStore";
  import type { Cell } from "$lib/Stores/types";

  let currentCell: Cell | null = null;
  currentCellStore.subscribe((value) => (currentCell = value));
</script>

{#if currentCell}
  <div class="cell-info">
    <div class="header">
      {#if currentCell.entity?.image}
        <img
          src={currentCell.entity.image}
          alt={currentCell.entity.name}
          class="avatar"
        />
      {/if}
      <div class="title">
        <div class="name">{currentCell.entity?.name ?? "Пустая клетка"}</div>
        <!-- <div class="type">{currentCell.entity?.type ?? currentCell.content}</div> -->
      </div>
    </div>

    {#if currentCell.entity}
      <div class="hp-row">
        <span class="label">Здоровье:</span>
        <span class="hp-text">{currentCell.entity.hp}</span>
      </div>

      {#if currentCell.entity.type === "player" && "coins" in currentCell.entity}
        <div class="stat-row">
          <span class="label">Монеты:</span>
          <span>{currentCell.entity.coins}</span>
          <img src="/img/coin.gif" alt="Монета" class="coin-gif" />
        </div>
      {/if}

      {#if currentCell.entity.type === "enemy" && "coinsReward" in currentCell.entity}
        <div class="stat-row">
          <span class="label">Награда:</span>
          <span>{currentCell.entity.coinsReward}</span>
          <img src="/img/coin.gif" alt="Монета" class="coin-gif" />
        </div>
      {/if}

      {#if currentCell.entity?.type === "enemy" && "attackDamage" in currentCell.entity}
        <div class="stat-row">
          <span class="label">Наносимый урон:</span>
          <span>{currentCell.entity.attackDamage}</span>
        </div>
      {/if}

      {#if currentCell.entity?.type === "enemy" && "attackRange" in currentCell.entity}
        <div class="stat-row">
          <span class="label">Радиус атаки:</span>
          <span>{currentCell.entity.attackRange}</span>
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
    color: #eee;
    padding: 1rem;
    border-radius: 10px;
    font-family: "Press Start 2P", monospace;
    font-size: 0.9rem;
    min-width: 270px;
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
    image-rendering: pixelated;
  }
  .title {
    display: flex;
    flex-direction: column;
  }
  .name {
    font-weight: bold;
    font-size: 1.1rem;
    color: #fff;
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
    font-weight: bold;
    color: #fff;
    text-shadow: 1px 1px 0 #000;
  }
  .hp-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    color: #fff;
    text-shadow: 0 0 3px #000;
    pointer-events: none;
    user-select: none;
    font-weight: bold;
  }
  .coin-gif {
    width: 16px;
    height: 16px;
    object-fit: contain;
    margin-left: 4px;
    image-rendering: pixelated;
  }
</style>
