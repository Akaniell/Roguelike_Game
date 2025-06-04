<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { ShopItem } from "$lib/Stores/types";

  export let item: ShopItem;

  const dispatch = createEventDispatcher();

  $: levelText =
    item.type === "upgrade" && item.currentLevel !== undefined
      ? `Уровень: ${item.currentLevel}${item.maxLevel ? ` / ${item.maxLevel}` : ""}`
      : "";

  $: purchasedText = item.type === "oneTime" && item.purchased ? "Куплено" : "";

  $: isMaxLevelReached =
    item.type === "upgrade" &&
    item.currentLevel !== undefined &&
    item.maxLevel !== undefined &&
    item.currentLevel >= item.maxLevel;

  function onBuyClick() {
    if (item.type === "oneTime" && item.purchased) return;
    dispatch("buy", item.id);
  }
</script>

<div lang="ru" class="shop-card">
  {#if item.icon}
    <img class="item-icon" src={item.icon} alt={`Иконка ${item.name}`} />
  {/if}

  <p class="item-name" title={item.name}>{item.name}</p>

  <p class="description">{item.description}</p>

  {#if levelText}
    <div class="level">{levelText}</div>
  {/if}

  {#if purchasedText}
    <div class="purchased">{purchasedText}</div>
  {/if}

  <div class="footer">
    <span class="price">
      {item.price} <img src="/img/coin.gif" alt="Монета" class="coin-gif" />
    </span>
    <button
      class="buy-button"
      on:click={onBuyClick}
      disabled={(item.type === "oneTime" && item.purchased) || isMaxLevelReached}
      aria-disabled={(item.type === "oneTime" && item.purchased) || isMaxLevelReached}
      title={(item.type === "oneTime" && item.purchased) || isMaxLevelReached
        ? "Уже куплено"
        : "Купить"}
    >
      Купить
    </button>
  </div>
</div>

<style>
  .shop-card {
    border: 2px solid var(--color-button-bg);
    border-radius: 8px;
    padding: 1rem;
    background-color: var(--color-button-bg);
    color: var(--color-button-text);
    width: 300px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .item-icon {
    width: 100%;
    height: 100px;
    object-fit: contain;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }

  .item-name {
    margin: 0 0 0.3rem 0;
    font-size: 1.3rem;
    white-space: normal;
    word-break: normal;
    overflow-wrap: break-word;
    hyphens: auto;
    text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
  }

  .description {
    font-size: 0.9rem;
    flex-grow: 1;
    line-height: 1.2;
  }

  .level,
  .purchased {
    font-size: 0.85rem;
    color: var(--color-accent);
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
  }

  .price {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
  }

  .coin-gif {
    width: auto;
    height: 16px;
    margin-left: 4px;
  }

  .buy-button {
    background-color: var(--color-button-text);
    color: var(--color-button-bg);
    border: none;
    border-radius: 6px;
    padding: 0.25rem 0.6rem;
    cursor: pointer;
    font-size: 0.85rem;
    width: 100%;
    transition: background-color 0.3s ease;
  }

  .buy-button:hover:not(:disabled) {
    background-color: var(--color-accent);
    color: var(--color-button-text);
  }

  .buy-button:disabled {
    opacity: 0.5;
    cursor: default;
  }
</style>
