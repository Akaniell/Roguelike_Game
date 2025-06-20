import type { ShopItem } from "$lib/Stores/types";
import type { Player } from "$lib/Stores/types";

const elements = ["Земля", "Огонь", "Вода", "Воздух"];

export const shopTemplates: ShopItem[] = [
  {
    id: "maxHp",
    name: "Увеличение максимального здоровья",
    description: "Увеличивает максимальное здоровье игрока на 10 единиц.",
    price: 20,
    type: "upgrade",
    currentLevel: 0,
    maxLevel: 10,
    effect: (player: Player) => ({
      ...player,
      maxHp: Math.min(player.maxHp + 10, 200),
      hp: player.hp + 10,
    }),
  },
  {
    id: "heal",
    name: "Лечение",
    description: "Восстанавливает 20 единиц здоровья.",
    price: 5,
    type: "consumable",
    effect: (player: Player) => ({
      ...player,
      hp: Math.min(player.maxHp, player.hp + 20),
    }),
  },
  {
    id: "newElement_1",
    name: "Открытие новой стихии",
    description: "Разблокирует случайную новую стихию.",
    price: 50,
    type: "oneTime",
    purchased: false,
    effect: (player: Player) => {
      const available = elements.filter((el) => !player.elements.includes(el));
      if (available.length === 0) return player;
      const randomElement =
        available[Math.floor(Math.random() * available.length)];
      return {
        ...player,
        elements: [...player.elements, randomElement],
      };
    },
  },
  {
    id: "newElement_2",
    name: "Открытие новой стихии",
    description: "Разблокирует случайную новую стихию.",
    price: 100,
    type: "oneTime",
    purchased: false,
    effect: (player: Player) => {
      const available = elements.filter((el) => !player.elements.includes(el));
      if (available.length === 0) return player;
      const randomElement =
        available[Math.floor(Math.random() * available.length)];
      return {
        ...player,
        elements: [...player.elements, randomElement],
      };
    },
  },
  {
    id: "extraSlot",
    name: "Дополнительная ячейка",
    description:
      "Увеличивает количество разблокированных ячеек для заклинаний.",
    price: 200,
    type: "upgrade",
    currentLevel: 2,
    maxLevel: 4,
    effect: (player: Player) => ({
      ...player,
      unlockedSlotsCount: Math.min(player.unlockedSlotsCount + 1, 4),
    }),
  },
];
