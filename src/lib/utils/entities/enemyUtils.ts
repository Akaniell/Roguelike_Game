import { enemiesStore } from "$lib/Stores/enemiesStore";
import { gameBoardStore } from "$lib/Stores/gameBoardStore";
import type { Cell, Enemy } from "$lib/Stores/types";
import { get } from "svelte/store";
import { findCellByEntityId, swapEntitiesInBoard } from "../board/boardUtils";
import { createEnemyFromTemplate } from "./enemyFactory";
import * as moveStrategies from "./moveStrategies";
import { playerStore } from "$lib/Stores/playerStore";
import { applyDamageToCell } from "../entityUtils";

export function addEnemyFromTemplate(template: Enemy, x: number, y: number) {
  const newEnemy = createEnemyFromTemplate(template);

  enemiesStore.update((enemies) => [...enemies, newEnemy]);

  gameBoardStore.update((board) => {
    const newCells = board.cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === y && colIndex === x) {
          return {
            ...cell,
            content: "enemy" as "enemy",
            entity: newEnemy,
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

export async function moveAllEnemies() {
  let board = get(gameBoardStore);
  let enemies = get(enemiesStore);
  let player = get(playerStore);

  await new Promise((resolve) => setTimeout(resolve, 500));

  const enemyCellsMap = new Map<string, Cell>();
  for (const row of board.cells) {
    for (const cell of row) {
      if (cell.entity?.type === "enemy" && cell.entity.id) {
        enemyCellsMap.set(cell.entity.id, cell);
      }
    }
  }

  let playerCell: Cell | null = null;
  outer: for (const row of board.cells) {
    for (const cell of row) {
      if (cell.content === "player") {
        playerCell = cell;
        break outer;
      }
    }
  }
  if (!playerCell) {
    console.warn("Игрок не найден на поле!");
    return;
  }

  for (const enemy of enemies) {
    const enemyCell = enemyCellsMap.get(enemy.id);
    if (!enemyCell) continue;
    

    const enemyEntity = enemyCell.entity as Enemy;

    const dist = moveStrategies.distance(
      enemyCell.x,
      enemyCell.y,
      playerCell.x,
      playerCell.y
    );

    if (dist <= (enemyEntity.attackRange ?? 1)) {
      await applyDamageToCell(
        playerCell.x,
        playerCell.y,
        enemyEntity.attackDamage ?? 1
      );

      player = get(playerStore);
      enemies = get(enemiesStore);
      board = get(gameBoardStore);

      enemyCellsMap.clear();
      for (const row of board.cells) {
        for (const cell of row) {
          if (cell.entity?.type === "enemy" && cell.entity.id) {
            enemyCellsMap.set(cell.entity.id, cell);
          }
        }
      }
    } else {
      const strategyName = enemyEntity.moveStrategy ?? "straight";
      const strategy =
        moveStrategies.moveStrategiesMap[strategyName] ??
        moveStrategies.moveStraight;

      const nextPos = strategy(enemyEntity, board);
      if (nextPos) {
        const targetCell = board.cells[nextPos.y]?.[nextPos.x];
        if (targetCell) {
          if (targetCell.content === "empty") {
            board = swapEntitiesInBoard(
              board,
              enemyCell.x,
              enemyCell.y,
              nextPos.x,
              nextPos.y
            );
            gameBoardStore.set(board);

            enemyCellsMap.clear();
            for (const row of board.cells) {
              for (const cell of row) {
                if (cell.entity?.type === "enemy" && cell.entity.id) {
                  enemyCellsMap.set(cell.entity.id, cell);
                }
              }
            }
          } else if (targetCell.content === "building" && targetCell.entity) {
            await applyDamageToCell(
              nextPos.x,
              nextPos.y,
              enemyEntity.attackDamage ?? 1
            );

            enemies = get(enemiesStore);
            board = get(gameBoardStore);

            enemyCellsMap.clear();
            for (const row of board.cells) {
              for (const cell of row) {
                if (cell.entity?.type === "enemy" && cell.entity.id) {
                  enemyCellsMap.set(cell.entity.id, cell);
                }
              }
            }
          }
        }
      }
    }
  }

  enemies = enemies.map((e) => {
    const cell = enemyCellsMap.get(e.id);
    if (cell?.entity?.type === "enemy") {
      return cell.entity as Enemy;
    }
    return e;
  });

  enemiesStore.set(enemies);
  playerStore.set(player);
  gameBoardStore.set(board);
}
