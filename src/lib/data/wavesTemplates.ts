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

  // Волна 3 — 3 скелета-воинов
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

  // Волна 5 — 4 гоблина и 2 скелета лучника
  [
    { ...enemyTemplates[0], id: "wave5_goblin1" },
    { ...enemyTemplates[0], id: "wave5_goblin2" },
    { ...enemyTemplates[0], id: "wave5_goblin3" },
    { ...enemyTemplates[0], id: "wave5_goblin4" },
    { ...enemyTemplates[1], id: "wave5_archer1" },
    { ...enemyTemplates[1], id: "wave5_archer2" },
  ],

  // Волна 6 — 5 скелетов-воинов и 1 королевский слайм
  [
    { ...enemyTemplates[3], id: "wave6_skeleton1" },
    { ...enemyTemplates[3], id: "wave6_skeleton2" },
    { ...enemyTemplates[3], id: "wave6_skeleton3" },
    { ...enemyTemplates[3], id: "wave6_skeleton4" },
    { ...enemyTemplates[3], id: "wave6_skeleton5" },
    { ...enemyTemplates[4], id: "wave6_king_slime" },
  ],

  // Волна 7 — 3 слайма и 3 гоблина
  [
    { ...enemyTemplates[2], id: "wave7_slime1" },
    { ...enemyTemplates[2], id: "wave7_slime2" },
    { ...enemyTemplates[2], id: "wave7_slime3" },
    { ...enemyTemplates[0], id: "wave7_goblin1" },
    { ...enemyTemplates[0], id: "wave7_goblin2" },
    { ...enemyTemplates[0], id: "wave7_goblin3" },
  ],

  // Волна 8 — 2 королевских слайма и 4 скелета лучника
  [
    { ...enemyTemplates[4], id: "wave8_king_slime1" },
    { ...enemyTemplates[4], id: "wave8_king_slime2" },
    { ...enemyTemplates[1], id: "wave8_archer1" },
    { ...enemyTemplates[1], id: "wave8_archer2" },
    { ...enemyTemplates[1], id: "wave8_archer3" },
    { ...enemyTemplates[1], id: "wave8_archer4" },
  ],

  // Волна 9 — 6 гоблинов и 2 скелета-воинов
  [
    { ...enemyTemplates[0], id: "wave9_goblin1" },
    { ...enemyTemplates[0], id: "wave9_goblin2" },
    { ...enemyTemplates[0], id: "wave9_goblin3" },
    { ...enemyTemplates[0], id: "wave9_goblin4" },
    { ...enemyTemplates[0], id: "wave9_goblin5" },
    { ...enemyTemplates[0], id: "wave9_goblin6" },
    { ...enemyTemplates[3], id: "wave9_skeleton1" },
    { ...enemyTemplates[3], id: "wave9_skeleton2" },
  ],

  // Волна 10 — Босс (например, король слаймов) и 3 скелета лучника
  [
    { ...enemyTemplates[4], id: "wave8_king_slime1" },
    { ...enemyTemplates[1], id: "wave10_archer1" },
    { ...enemyTemplates[1], id: "wave10_archer2" },
    { ...enemyTemplates[1], id: "wave10_archer3" },
  ],
];
