import { enemiesStore } from "$lib/Stores/enemiesStore";
import { gameBoardStore } from "$lib/Stores/gameBoardStore";
import type { Cell, Enemy, GameBoard } from "$lib/Stores/types";
import { get } from "svelte/store";
import {
  findCellByEntityId,
  swapEntitiesInBoard,
} from "../board/boardUtils";
import { createEnemyFromTemplate, createRandomEnemy } from "./enemyFactory";
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

  // Копируем клетки для локальной работы с board (если нужно)
  // Можно убрать, если не используешь локальную копию
  // let newCells: Cell[][] = board.cells.map(...);
  // let newBoard: GameBoard = { ...board, cells: newCells };

  for (const enemy of enemies) {
    const enemyCell = findCellByEntityId(board, enemy.id);
    if (!enemyCell) continue;

    let playerCell: Cell | null = null;
    for (const row of board.cells) {
      for (const cell of row) {
        if (cell.content === "player") {
          playerCell = cell;
          break;
        }
      }
      if (playerCell) break;
    }
    if (!playerCell) continue;

    const dist = moveStrategies.distance(
      enemyCell.x,
      enemyCell.y,
      playerCell.x,
      playerCell.y
    );

    if (dist <= (enemy.attackRange ?? 1)) {
      applyDamageToCell(playerCell.x, playerCell.y, enemy.attackDamage ?? 1);

      player = get(playerStore);
      enemies = get(enemiesStore);
      board = get(gameBoardStore);
    } else {
      const strategyName = enemy.moveStrategy ?? "straight";
      const strategy =
        moveStrategies.moveStrategiesMap[strategyName] ??
        moveStrategies.moveStraight;

      const nextPos = strategy(enemy, board);
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
          } else if (targetCell.content === "building" && targetCell.entity) {
            applyDamageToCell(nextPos.x, nextPos.y, enemy.attackDamage ?? 1);

            enemies = get(enemiesStore);
            board = get(gameBoardStore);
          }
        }
      }
    }
  }

  enemies = enemies.filter((enemy) => {
    const cell = findCellByEntityId(board, enemy.id);
    return cell !== null;
  });

  enemiesStore.set(enemies);
  playerStore.set(player);
  gameBoardStore.set(board);
}
