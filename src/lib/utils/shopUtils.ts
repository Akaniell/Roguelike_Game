import { get } from "svelte/store";
import { shopStore } from "$lib/Stores/shopStore";
import { playerStore } from "$lib/Stores/playerStore";
import type { Player } from "$lib/Stores/types";

export function buyItem(itemId: string): boolean {
  const player = get(playerStore);
  let canBuy = false;

  shopStore.update((items) => {
    return items.map((item) => {
      if (item.id !== itemId) return item;

      if (player.coins < item.price) {
        alert("Недостаточно монет");
        return item;
      }

      if (item.type === "oneTime" && item.purchased) {
        alert("Этот предмет уже куплен");
        return item;
      }

      if (
        item.type === "upgrade" &&
        item.maxLevel !== undefined &&
        (item.currentLevel ?? 0) >= item.maxLevel
      ) {
        alert("Достигнут максимальный уровень");
        return item;
      }

      if (item.type === "consumable") {
        canBuy = true;
        return item;
      }

      canBuy = true;

      if (item.type === "oneTime") {
        return { ...item, purchased: true };
      } else if (item.type === "upgrade") {
        const currentLevel = (item.currentLevel ?? 0) + 1;
        return { ...item, currentLevel };
      }
      return item;
    });
  });

  if (!canBuy) return false;

  playerStore.update((p) => ({
    ...p,
    coins: p.coins - get(shopStore).find((i) => i.id === itemId)!.price,
  }));

  const updatedItem = get(shopStore).find((item) => item.id === itemId);
  if (!updatedItem) return false;

  playerStore.update((p: Player) => {
    if (updatedItem.effect) {
      return updatedItem.effect({ ...p });
    }
    return p;
  });

  return true;
}
