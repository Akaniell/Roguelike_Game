<script lang="ts">
  import ShopItemCard from "$lib/components/ShopItemCard.svelte";
  import { shopStore } from "$lib/Stores/shopStore";
  import { buyItem } from "$lib/utils/shopUtils";
  import { playerStore } from "$lib/Stores/playerStore";

  function handleBuy(event: CustomEvent<string>) {
    buyItem(event.detail);
  }
</script>

<p class="page-title">Магазин</p>

<div class="coins-display">
  <span class="coins-count">{$playerStore.coins}</span>
  <img src="/img/coin.gif" alt="Монета" class="coin-icon" />
</div>

<div class="shop-list">
  {#each $shopStore as item (item.id)}
    <ShopItemCard {item} on:buy={handleBuy} />
  {/each}
</div>

<style>
  .page-title {
    font-size: 48px;
    color: #eee;
    text-align: center;
    margin: 1rem 0;
    font-family: "Press Start 2P", cursive, monospace;
    text-shadow:
      -2px -2px 0 #000,
      2px -2px 0 #000,
      -2px 2px 0 #000,
      2px 2px 0 #000;
  }

  .coins-display {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-family: "Press Start 2P", cursive, monospace;
    font-size: 1.5rem;
    color: #ffd700; /* золотистый цвет */
    text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
    margin-bottom: 1rem;
  }

  .coin-icon {
    width: 24px;
    height: 24px;
  }

  .coins-count {
    min-width: 40px;
    text-align: left;
  }

  .shop-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    padding: 0 1rem 2rem;
  }
</style>
