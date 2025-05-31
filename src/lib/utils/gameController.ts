import { wavesTemplates } from "$lib/data/wavesTemplates";
import { enemiesStore } from "$lib/Stores/enemiesStore";
import { currentWaveStore, gameBoardStore } from "$lib/Stores/gameBoardStore";
import { createEnemyFromTemplate } from "./entities/enemyFactory";
import { addEnemyFromTemplate } from "./entities/enemyUtils";

enemiesStore.subscribe((enemies) => {
  if (enemies.length === 0 && localStorage.getItem("currentWave") !== "0") {
    currentWaveStore.update((n) => {
      const newWave = n + 1;
      spawnWave(newWave);
      return newWave;
    });
  }
});

export function spawnWave(waveNumber: number) {
  const waveEnemiesTemplates = wavesTemplates[waveNumber - 1] || [];
  const columnIndex = 8;
  const maxRows = 7;

  const newEnemies = waveEnemiesTemplates.map((template, index) => {
    const enemy = createEnemyFromTemplate(template);
    enemy.id = `${waveNumber}_${template.id}_${index}`;
    return enemy;
  });

  enemiesStore.set(newEnemies);

  gameBoardStore.update((board) => {
    const newCells = board.cells.map((row) => row.map((cell) => ({ ...cell })));

    newEnemies.forEach((enemy, index) => {
      const y = index % maxRows;
      newCells[y][columnIndex] = {
        ...newCells[y][columnIndex],
        content: "enemy" as const,
        entity: enemy,
      };
    });

    return {
      ...board,
      cells: newCells,
    };
  });

  console.log(`Запущена волна ${waveNumber} с ${newEnemies.length} врагами`);
}
