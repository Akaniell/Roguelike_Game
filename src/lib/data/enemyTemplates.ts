import type { Enemy } from "$lib/Stores/types";

export const enemyTemplates: Enemy[] = [
  {
    id: "0",
    name: "Гоблин",
    type: "enemy",
    hp: 30,
    coinsReward: 1,
    image: "/img/enemies/goblin.gif",
  },
  {
    id: "0",
    name: "Скелет лучник",
    type: "enemy",
    hp: 50,
    coinsReward: 1,
    image: "/img/enemies/skeleton-archer.gif",
  },
  {
    id: "zombie",
    name: "Слайм",
    type: "enemy",
    hp: 70,
    coinsReward: 3,
    image: "/img/enemies/normal-slime.gif",
  },
  {
    id: "0",
    name: "Скелет-воин",
    type: "enemy",
    hp: 100,
    coinsReward: 5,
    image: "/img/enemies/skeleton-melee.gif",
  },
  {
    id: "0",
    name: "Королевский слайм",
    type: "enemy",
    hp: 150,
    coinsReward: 10,
    image: "/img/enemies/king-slime.gif",
  },
];
