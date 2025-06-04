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

export function createBuildingFromTemplate(
  templateId: string,
  currentWave: number
): Building | null {
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
  const board = get(gameBoardStore);

  if (
    y < 0 ||
    y >= board.height ||
    x < 0 ||
    x >= board.width ||
    board.cells[y][x].content !== "empty"
  ) {
    console.warn(
      `Нельзя поставить постройку на занятую или несуществующую клетку (${x}, ${y})`
    );
    return;
  }

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

export function removeAllBuildings() {
  buildingsStore.set([]);

  gameBoardStore.update((board) => {
    const newCells = board.cells.map((row) =>
      row.map((cell) => {
        if (cell.content === "building") {
          return {
            ...cell,
            content: "empty" as "empty",
            entity: undefined,
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

export function placeRandomStoneWalls() {
  const board = get(gameBoardStore);
  const count = Math.floor(Math.random() * 5 + 1)

  let playerPos: { x: number; y: number } | null = null;
  outer: for (let y = 0; y < board.height; y++) {
    for (let x = 0; x < board.width; x++) {
      if (board.cells[y][x].content === "player") {
        playerPos = { x, y };
        break outer;
      }
    }
  }
  if (!playerPos) {
    console.warn("Игрок не найден на поле");
    return;
  }

  const possiblePositions: { x: number; y: number }[] = [];
  for (let x = 1; x <= 6 && x < board.width; x++) {
    for (let y = 0; y < board.height; y++) {
      if (
        board.cells[y][x].content === "empty" &&
        !(playerPos.x === x && playerPos.y === y)
      ) {
        possiblePositions.push({ x, y });
      }
    }
  }

  if (possiblePositions.length === 0) {
    console.warn("Нет доступных клеток для установки каменных стен");
    return;
  }

  const shuffled = possiblePositions.sort(() => Math.random() - 0.5);
  const selectedPositions = shuffled.slice(0, Math.min(count, shuffled.length));

  const stoneWallTemplate = buildingTemplates.find(
    (b) => b.id === "stone-wall"
  );
  if (!stoneWallTemplate) {
    console.warn("Шаблон каменной стены не найден");
    return;
  }

  const newWalls = selectedPositions
    .map((pos) => createBuildingFromTemplate(stoneWallTemplate.id, get(currentWaveStore)))
    .filter((b): b is Building => b !== null);

  buildingsStore.update((buildings) => [...buildings, ...newWalls]);

  gameBoardStore.update((board) => {
    const newCells = board.cells.map((row, y) =>
      row.map((cell, x) => {
        const index = selectedPositions.findIndex(
          (pos) => pos.x === x && pos.y === y
        );
        if (index !== -1) {
          return {
            ...cell,
            content: "building" as "building",
            entity: newWalls[index],
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
