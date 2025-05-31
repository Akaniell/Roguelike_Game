import { enemiesStore } from "$lib/Stores/enemiesStore";
import { gameBoardStore } from "$lib/Stores/gameBoardStore";
import { playerStore } from "$lib/Stores/playerStore";
import type { Building, Enemy, Player } from "$lib/Stores/types";
import { derived, get } from "svelte/store";

export function applyDamageToCell(x: number, y: number, damage: number) {
  let coinsReward = 0;
  let enemyIdToRemove: string | null = null;

  // Синхронно получаем актуальные значения стора
  let currentPlayer = get(playerStore);
  let currentEnemies = get(enemiesStore);

  gameBoardStore.update((board) => {
    const newCells = board.cells.map((row) =>
      row.map((cell) => ({
        ...cell,
        entity: cell.entity ? { ...cell.entity } : undefined,
      }))
    );

    const cell = newCells[y][x];

    if (cell.entity && cell.entity.hp > 0) {
      switch (cell.entity.type) {
        case "player":
          {
            const playerEntity = cell.entity as Player;
            playerEntity.hp -= damage;

            if (currentPlayer) {
              console.log("До обновления player:", currentPlayer.elements);
              currentPlayer = { ...currentPlayer, hp: playerEntity.hp };
              console.log("После обновления player:", currentPlayer.elements);
              playerStore.set(currentPlayer);
            }

            if (playerEntity.hp <= 0) {
              cell.content = "empty";
              cell.entity = undefined;
            }
          }
          break;

        case "enemy":
          {
            const enemyEntity = cell.entity as Enemy;
            enemyEntity.hp -= damage;

            if (enemyEntity.hp <= 0) {
              coinsReward = enemyEntity.coinsReward || 0;
              enemyIdToRemove = enemyEntity.id;
              cell.content = "empty";
              cell.entity = undefined;
            } else {
              currentEnemies = currentEnemies.map((enemy) =>
                enemy.id === enemyEntity.id ? { ...enemyEntity } : enemy
              );
            }
          }
          break;

        default:
          console.log(`Неизвестный тип сущности (${cell.entity.type})`);
      }
    } else {
      console.log(`В клетке (${x}, ${y}) нет сущности для нанесения урона.`);
    }

    return { ...board, cells: newCells };
  });

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
}

export function applyHealToCell(x: number, y: number, heal: number) {
  gameBoardStore.update((board) => {
    const cell = board.cells[y][x];

    if (cell.entity && cell.entity.hp > 0) {
      switch (cell.entity.type) {
        case "player":
          playerStore.update((player) => {
            if (player) {
              player.hp += heal;
              if (cell.entity) cell.entity.hp = player.hp;
            }
            return { ...player };
          });
          break;

        case "enemy":
          enemiesStore.update((enemies) => {
            return enemies.map((enemy) => {
              if (enemy.id === cell.entity?.id) {
                enemy.hp += heal;
                cell.entity.hp = enemy.hp;
                return { ...enemy };
              }
              return enemy;
            });
          });
          break;

        default:
          console.log(
            `Неизвестный тип сущности (${cell.entity.type}) на клетке (${x}, ${y}).`
          );
      }
      console.log(
        `Сущности (${cell.entity.name}) на клетке (${x}, ${y}) восстановлено здоровье. HP: ${cell.entity.hp}`
      );
    } else {
      console.log(
        `В клетке (${x}, ${y}) нет сущности для восстановления здоровья.`
      );
    }

    return board;
  });
}

// export function getEntityInfo(
//   x: number,
//   y: number
// ): {
//   entity: Player | Enemy | Building | undefined;
//   type: "empty" | "player" | "enemy" | "building";
// } {
//   let result: {
//     entity: Player | Enemy | Building | undefined;
//     type: "empty" | "player" | "enemy" | "building";
//   } = { entity: undefined, type: "empty" };

//   gameBoardStore.subscribe((board) => {
//     if (x >= 0 && x < board.width && y >= 0 && y < board.height) {
//       result = {
//         entity: board.cells[y][x].entity,
//         type: board.cells[y][x].content,
//       };
//     }
//   })();

//   return result;
// }

export function getEntityInfo(x: number, y: number) {
  return derived(gameBoardStore, ($board) => ({
    entity: $board.cells[y]?.[x]?.entity,
    type: $board.cells[y]?.[x]?.content ?? "empty",
  }));
}
