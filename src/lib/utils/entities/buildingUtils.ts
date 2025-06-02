import { buildingTemplates } from "$lib/data/buildingTemplates";
import { buildingsStore } from "$lib/Stores/buildingStore";
import { currentWaveStore, gameBoardStore } from "$lib/Stores/gameBoardStore";
import type { Building } from "$lib/Stores/types";
import { get } from "svelte/store";

export function addBuilding(building: Building) {
  const currentWave = get(currentWaveStore);

  const buildingWithWave = {
    ...building,
    createdWave: currentWave,
  };

  buildingsStore.update((buildings) => [...buildings, buildingWithWave]);
}

export function createBuildingFromTemplate(templateId: string, currentWave: number): Building | null {
  const template = buildingTemplates.find((b) => b.id === templateId);
  if (!template) return null;

  return {
    ...template,
    id: crypto.randomUUID(),
    createdWave: currentWave,
  };
}

export function placeBuildingOnField(templateId: string, x: number, y: number) {
  const currentWave = get(currentWaveStore);

  const newBuilding = createBuildingFromTemplate(templateId, currentWave);
  if (!newBuilding) {
    console.warn(`Шаблон постройки с id "${templateId}" не найден`);
    return;
  }

  buildingsStore.update((buildings) => [...buildings, newBuilding]);

  gameBoardStore.update((board) => {
    const newCells = board.cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === y && colIndex === x) {
          return {
            ...cell,
            content: "building" as const,
            entity: newBuilding,
          };
        }
        return cell;
      })
    );

    return {
      ...board,
      cells: newCells,
    };
  });
}

export function cleanupExpiredBuildings() {
  const currentWave = get(currentWaveStore);

  buildingsStore.update((buildings) => {
    return buildings.filter((building) => {
      if (
        building.durationInWaves === undefined ||
        building.createdWave === undefined
      ) {
        return true;
      }
      return currentWave - building.createdWave < building.durationInWaves;
    });
  });
}
