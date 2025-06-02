import { get } from "svelte/store";
import { shopStore } from "$lib/Stores/shopStore";
import { playerStore } from "$lib/Stores/playerStore";
import type { Player } from "$lib/Stores/types";

export function buyItem(itemId: string): boolean {
  const shopItems = get(shopStore);
  const player = get(playerStore);

  const itemIndex = shopItems.findIndex((item) => item.id === itemId);
  if (itemIndex === -1) return false;

  const item = shopItems[itemIndex];

  if (player.coins < item.price) {
    alert("Недостаточно монет");
    return false;
  }

  if (item.type === "oneTime" && item.purchased) {
    alert("Этот предмет уже куплен");
    return false;
  }

  // Списываем монеты
  playerStore.update((p) => ({ ...p, coins: p.coins - item.price }));

  // Применяем эффект
  playerStore.update((p: Player) => item.effect(p));

  // Обновляем магазин
  if (item.type === "oneTime") {
    shopStore.update((items) => {
      const newItems = [...items];
      newItems[itemIndex] = { ...item, purchased: true };
      return newItems;
    });
  } else if (item.type === "upgrade") {
    shopStore.update((items) => {
      const newItems = [...items];
      const currentLevel = (item.currentLevel ?? 0) + 1;
      newItems[itemIndex] = { ...item, currentLevel };
      return newItems;
    });
  }

  return true;
}
