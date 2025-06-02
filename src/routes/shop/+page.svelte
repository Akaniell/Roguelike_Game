<script lang="ts">
  import ShopItemCard from "$lib/components/ShopItemCard.svelte";
  import { shopStore } from "$lib/Stores/shopStore"; 
  import { buyItem } from "$lib/utils/shopUtils"; 

  let items = $shopStore;

  function handleBuy(event: CustomEvent<string>) {
    buyItem(event.detail);
  }
</script>

<p class="page-title">Магазин</p>

<div class="shop-list">
  {#each items as item (item.id)}
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

  .shop-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    padding: 0 1rem 2rem;
  }
</style>
