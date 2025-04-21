import type { Enemy } from "$lib/Stores/types";

export const enemyTemplates: Enemy[] = [
  {
    id: 0,
    name: "Гоблин",
    type: "enemy",
    hp: 30,
    coinsReward: 1,
  },
  {
    id: 0,
    name: "Орк",
    type: "enemy",
    hp: 50,
    coinsReward: 1,
  },
  {
    id: 0,
    name: "Тролль",
    type: "enemy",
    hp: 80,
    coinsReward: 2,
  },
  {
    id: 0,
    name: "Скелет",
    type: "enemy",
    hp: 100,
    coinsReward: 5,
  },
];
