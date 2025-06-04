import type { Enemy } from "$lib/Stores/types";
import { enemyTemplates } from "./enemyTemplates";

export const wavesTemplates: Enemy[][] = [
  // Волна 1 — 2 гоблина
  [
    { ...enemyTemplates[0], id: "wave1_goblin1" },
    { ...enemyTemplates[0], id: "wave1_goblin2" },
  ],

  // Волна 2 — 3 гоблина и 1 скелет лучник
  [
    { ...enemyTemplates[0], id: "wave2_goblin1" },
    { ...enemyTemplates[0], id: "wave2_goblin2" },
    { ...enemyTemplates[0], id: "wave2_goblin3" },
    { ...enemyTemplates[1], id: "wave2_archer1" },
  ],

  // Волна 3 — 5 скелетов-воинов
  [
    { ...enemyTemplates[3], id: "wave3_skeleton1" },
    { ...enemyTemplates[3], id: "wave3_skeleton2" },
    { ...enemyTemplates[3], id: "wave3_skeleton3" },
  ],

  // Волна 4 — 1 королевский слайм и 2 слайма
  [
    { ...enemyTemplates[4], id: "wave4_king_slime" },
    { ...enemyTemplates[2], id: "wave4_slime1" },
    { ...enemyTemplates[2], id: "wave4_slime2" },
  ],
];