//enemyUtils.ts
import { enemiesStore } from "$lib/Stores/enemiesStore";
import { gameBoardStore } from "$lib/Stores/gameBoardStore";
import type { Enemy } from "$lib/Stores/types";
import { createEnemyFromTemplate, createRandomEnemy } from "./enemyFactory";

export function addEnemy(name: string, hp: number, image: string) {
  let type = "enemy" as "player" | "enemy" | "building";
  let coinsReward = 1;
  enemiesStore.update((enemies) => {
    const newEnemy = {
      id: crypto.randomUUID(),
      name,
      type,
      hp,
      coinsReward,
      image,
    };
    return [...enemies, newEnemy];
  });
}

export function removeEnemy(id: string) {
  enemiesStore.update((enemies) => enemies.filter((enemy) => enemy.id !== id));
}

export function addEnemyFromTemplate(template: Enemy, x: number, y: number) {
  const newEnemy = createEnemyFromTemplate(template);

  enemiesStore.update((enemies) => [...enemies, newEnemy]);

  gameBoardStore.update((board) => {
    board.cells[y][x].content = "enemy";
    board.cells[y][x].entity = newEnemy;
    return board;
  });
}

export function addRandomEnemy(x: number, y: number) {
  const newEnemy = createRandomEnemy();

  enemiesStore.update((enemies) => [...enemies, newEnemy]);

  gameBoardStore.update((board) => {
    board.cells[y][x].content = "enemy";
    board.cells[y][x].entity = newEnemy;
    return board;
  });
}
