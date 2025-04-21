import { enemiesStore } from "$lib/Stores/enemiesStore";
import { gameBoardStore } from "$lib/Stores/gameBoardStore";
import { playerStore } from "$lib/Stores/playerStore";
import type { Building, Enemy, Player } from "$lib/Stores/types";
import { createEnemyFromTemplate, createRandomEnemy } from "./enemyFactory";

export function addEnemy(name: string, hp: number) {
  let type = "enemy" as "player" | "enemy" | "building";
  let coinsReward = 1;
  enemiesStore.update((enemies) => {
    const newEnemy = {
      id: Date.now(),
      name,
      type,
      hp,
      coinsReward,
    };
    return [...enemies, newEnemy];
  });
}

export function removeEnemy(id: number) {
  enemiesStore.update((enemies) => enemies.filter((enemy) => enemy.id !== id));
}

export function placeEntityOnBoard(
  entity: Enemy | Player | Building,
  x: number,
  y: number
) {
  gameBoardStore.update((board) => {
    board.cells[y][x].content = entity.type as
      | "empty"
      | "player"
      | "enemy"
      | "building";
    board.cells[y][x].entity = entity;
    return board;
  });
}

export function removeEntityFromBoard(x: number, y: number) {
  gameBoardStore.update((board) => {
    board.cells[y][x].content = "empty";
    board.cells[y][x].entity = undefined;
    return board;
  });
}

export function movePlayerToBoard(player: Player, x: number, y: number) {
  gameBoardStore.update((board) => {
    if (board.cells[y][x].content !== "empty") {
      throw new Error(`Клетка (${x}, ${y}) не пуста`);
    }
    for (let i = 0; i < board.height; i++) {
      for (let j = 0; j < board.width; j++) {
        if (board.cells[i][j].content === "player") {
          board.cells[i][j].content = "empty";
          board.cells[i][j].entity = undefined;
        }
      }
    }
    board.cells[y][x].content = "player";
    board.cells[y][x].entity = player;
    return board;
  });
}

export function applyDamageToCell(x: number, y: number, damage: number) {
  let coinsReward = 0;
  let enemyIdToRemove: number | null = null;

  // Получим текущие значения сторов для синхронизации
  let currentPlayer: Player | undefined;
  playerStore.subscribe((p) => (currentPlayer = p))();
  let currentEnemies: Enemy[] = [];
  enemiesStore.subscribe((e) => (currentEnemies = e))();

  // Обновляем игровое поле
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

            // Обновляем playerStore
            if (currentPlayer) {
              currentPlayer = { ...currentPlayer, hp: playerEntity.hp };
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
              // Обновляем enemy в currentEnemies
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

  // Если враг убит, обновляем enemiesStore и начисляем монеты игроку
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
    // Если враг не убит, просто обновляем enemiesStore с изменённым HP
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

export function swapEntities(
  cell1X: number,
  cell1Y: number,
  cell2X: number,
  cell2Y: number
) {
  gameBoardStore.update((board) => {
    if (
      cell1Y < 0 ||
      cell1Y >= board.height ||
      cell1X < 0 ||
      cell1X >= board.width ||
      cell2Y < 0 ||
      cell2Y >= board.height ||
      cell2X < 0 ||
      cell2X >= board.width
    ) {
      console.error("Invalid cell coordinates for swap!");
      return board;
    }

    const cell1 = board.cells[cell1Y][cell1X];
    const cell2 = board.cells[cell2Y][cell2X];

    const tempContent = cell1.content;
    const tempEntity = cell1.entity;

    cell1.content = cell2.content;
    cell1.entity = cell2.entity;

    cell2.content = tempContent;
    cell2.entity = tempEntity;

    console.log(
      `Обмен сущностей между (${cell1X}, ${cell1Y}) и (${cell2X}, ${cell2Y})`
    );

    return board;
  });
}

export function handleCellAction(
  x: number,
  y: number,
  action: string,
  amount: number = 10
) {
  switch (action) {
    case "damage":
      applyDamageToCell(x, y, amount);
      break;
    case "heal":
      applyHealToCell(x, y, amount);
      break;
    default:
      console.log(`Неизвестное действие "${action}" для клетки (${x}, ${y})`);
  }
}

export function getEntityInfo(
  x: number,
  y: number
): {
  entity: Player | Enemy | Building | undefined;
  type: "empty" | "player" | "enemy" | "building";
} {
  let result: {
    entity: Player | Enemy | Building | undefined;
    type: "empty" | "player" | "enemy" | "building";
  } = { entity: undefined, type: "empty" };

  gameBoardStore.subscribe((board) => {
    if (x >= 0 && x < board.width && y >= 0 && y < board.height) {
      result = {
        entity: board.cells[y][x].entity,
        type: board.cells[y][x].content,
      };
    }
  })();

  return result;
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
