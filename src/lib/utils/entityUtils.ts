import { buildingsStore } from "$lib/Stores/buildingStore";
import { enemiesStore } from "$lib/Stores/enemiesStore";
import { gameBoardStore } from "$lib/Stores/gameBoardStore";
import { playerStore } from "$lib/Stores/playerStore";
import type { Building, Cell, Enemy, Player } from "$lib/Stores/types";
import { derived, get } from "svelte/store";

interface ApplyDamageResult {
  updatedPlayer?: Player;
  enemyIdToRemove?: string;
  buildingRemoved?: boolean;
}

export async function applyDamageToCell(
  x: number,
  y: number,
  damage: number
): Promise<ApplyDamageResult> {
  //await new Promise((resolve) => setTimeout(resolve, 300));
  let coinsReward = 0;
  let enemyIdToRemove: string | null = null;
  let buildingRemoved = false;

  let currentPlayer = get(playerStore);
  let currentEnemies = get(enemiesStore);
  let currentBuildings = get(buildingsStore);

  gameBoardStore.update((board) => {
    const newCells: Cell[][] = board.cells.map((row) =>
      row.map((cell) => ({
        ...cell,
        entity: cell.entity ? { ...cell.entity } : undefined,
      }))
    );

    const cell = newCells[y][x];

    if (cell.entity && cell.entity.hp > 0) {
      switch (cell.entity.type) {
        case "player": {
          const playerEntity = { ...cell.entity } as Player;
          playerEntity.hp -= damage;

          if (currentPlayer) {
            currentPlayer = { ...currentPlayer, hp: playerEntity.hp };
            playerStore.set(currentPlayer);
          }

          if (playerEntity.hp <= 0) {
            cell.content = "empty";
            cell.entity = undefined;
          } else {
            cell.entity = playerEntity;
          }
          break;
        }

        case "enemy": {
          const enemyEntity = { ...cell.entity } as Enemy;
          enemyEntity.hp -= damage;

          if (enemyEntity.hp <= 0) {
            coinsReward = enemyEntity.coinsReward || 0;
            enemyIdToRemove = enemyEntity.id;
            cell.content = "empty";
            cell.entity = undefined;
          } else {
            cell.entity = enemyEntity;
            currentEnemies = currentEnemies.map((enemy) =>
              enemy.id === enemyEntity.id ? enemyEntity : enemy
            );
          }
          break;
        }

        case "building": {
          const buildingEntity = { ...cell.entity } as Building;
          buildingEntity.hp -= damage;

          if (buildingEntity.hp <= 0) {
            buildingRemoved = true;
            currentBuildings = currentBuildings.filter(
              (building) => building.id !== buildingEntity.id
            );
            cell.content = "empty";
            cell.entity = undefined;
          } else {
            cell.entity = buildingEntity;
          }
          break;
        }

        default:
          console.log(`Неизвестный тип сущности (${cell.entity.type})`);
      }
    } else {
      console.log(`В клетке (${x}, ${y}) нет сущности для нанесения урона.`);
    }

    return { ...board, cells: newCells };
  });

  // Обновляем сторы после изменения
  if (enemyIdToRemove !== null) {
    currentEnemies = currentEnemies.filter(
      (enemy) => enemy.id !== enemyIdToRemove
    );
    enemiesStore.set(currentEnemies);

    if (currentPlayer) {
      currentPlayer = {
        ...currentPlayer,
        coins: currentPlayer.coins + coinsReward,
      };
      playerStore.set(currentPlayer);
    }
  } else {
    enemiesStore.set(currentEnemies);
  }

  if (buildingRemoved) {
    buildingsStore.set(currentBuildings);
  }

  return {
    updatedPlayer: currentPlayer,
    enemyIdToRemove: enemyIdToRemove ?? undefined,
    buildingRemoved,
  };
}

export function applyHealToCell(x: number, y: number, heal: number) {
  let currentPlayer = get(playerStore);
  let currentEnemies = get(enemiesStore);

  gameBoardStore.update((board) => {
    const newCells = board.cells.map((row) =>
      row.map((cell) => ({
        ...cell,
        entity: cell.entity ? { ...cell.entity } : undefined,
      }))
    );

    const cell = newCells[y]?.[x];
    if (!cell || !cell.entity) {
      return board;
    }

    switch (cell.entity.type) {
      case "player": {
        const playerEntity = cell.entity as Player;
        playerEntity.hp = Math.min(playerEntity.hp + heal, playerEntity.maxHp);

        currentPlayer = { ...currentPlayer, hp: playerEntity.hp };
        playerStore.set(currentPlayer);
        break;
      }
      case "enemy": {
        const enemyEntity = cell.entity as Enemy;
        enemyEntity.hp = Math.min(enemyEntity.hp + heal, enemyEntity.maxHp);

        currentEnemies = currentEnemies.map((enemy) =>
          enemy.id === enemyEntity.id ? { ...enemyEntity } : enemy
        );
        enemiesStore.set(currentEnemies);
        break;
      }
      default:
        console.warn(
          `Неизвестный тип сущности (${cell.entity.type}) в клетке (${x}, ${y}).`
        );
    }

    return { ...board, cells: newCells };
  });
}

export function getEntityInfo(x: number, y: number) {
  return derived(gameBoardStore, ($board) => ({
    entity: $board.cells[y]?.[x]?.entity,
    type: $board.cells[y]?.[x]?.content ?? "empty",
  }));
}
