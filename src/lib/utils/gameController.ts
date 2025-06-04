import { browser } from "$app/environment";
import { wavesTemplates } from "$lib/data/wavesTemplates";
import { enemiesStore } from "$lib/Stores/enemiesStore";
import { currentWaveStore, gameBoardStore } from "$lib/Stores/gameBoardStore";
import { get, writable } from "svelte/store";
import { createEnemyFromTemplate } from "./entities/enemyFactory";
import { placeRandomStoneWalls, removeAllBuildings } from "./entities/buildingUtils";
import { playerStore } from "$lib/Stores/playerStore";

let isSpawning = false;
export const isPlayerDead = writable(false);

playerStore.subscribe((player) => {
  if (player.hp <= 0) {
    isPlayerDead.set(true);
  }
});

enemiesStore.subscribe((enemies) => {
  if (browser) {
    if (!isSpawning && enemies.length === 0 && localStorage.getItem("currentWave") !== "0") {
      isSpawning = true;
      currentWaveStore.update((n) => {
        const newWave = n + 1;
        removeAllBuildings();
        spawnWave(newWave);
        placeRandomStoneWalls();
        return newWave;
      });
      setTimeout(() => {
        isSpawning = false;
      }, 100);
    }
  }
});

export function spawnWave(waveNumber: number) {
  const board = get(gameBoardStore);
  const waveEnemiesTemplates = wavesTemplates[waveNumber - 1] || [];

  const newEnemies = waveEnemiesTemplates.map((template, index) => {
    const enemy = createEnemyFromTemplate(template);
    enemy.id = `${waveNumber}_${template.id}_${index}`;
    return enemy;
  });

  enemiesStore.set(newEnemies);
  const lastColumns = [board.width - 2, board.width - 1];
  const availablePositions: { x: number; y: number }[] = [];

  for (const x of lastColumns) {
    for (let y = 0; y < board.height; y++) {
      const cell = board.cells[y][x];
      if (cell.content === "empty") {
        availablePositions.push({ x, y });
      }
    }
  }

  function getRandomUniquePositions(count: number, positions: { x: number; y: number }[]) {
    const shuffled = positions.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  const spawnPositions = getRandomUniquePositions(newEnemies.length, availablePositions);

  gameBoardStore.update((board) => {
    const newCells = board.cells.map((row) => row.map((cell) => ({ ...cell })));

    newEnemies.forEach((enemy, index) => {
      const pos = spawnPositions[index];
      if (!pos) return;

      newCells[pos.y][pos.x] = {
        ...newCells[pos.y][pos.x],
        content: "enemy" as const,
        entity: enemy,
      };
    });

    return {
      ...board,
      cells: newCells,
    };
  });
}
