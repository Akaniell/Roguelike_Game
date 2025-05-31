//enemyUtils.ts
import { enemiesStore } from "$lib/Stores/enemiesStore";
import { gameBoardStore } from "$lib/Stores/gameBoardStore";
import type { Cell, Enemy, GameBoard } from "$lib/Stores/types";
import { get } from "svelte/store";
import {
  applyDamageToCellInBoard,
  findCellByEntityId,
  swapEntitiesInBoard,
} from "../board/boardUtils";
import { createEnemyFromTemplate, createRandomEnemy } from "./enemyFactory";
import * as moveStrategies from "./moveStrategies";
import { playerStore } from "$lib/Stores/playerStore";

export function removeEnemy(id: string) {
  enemiesStore.update((enemies) => enemies.filter((enemy) => enemy.id !== id));
}

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

export function addRandomEnemy(x: number, y: number) {
  const newEnemy = createRandomEnemy();

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

export function moveAllEnemies() {
  const board = get(gameBoardStore);
  let enemies = get(enemiesStore);
  let player = get(playerStore);

  const newCells: Cell[][] = board.cells.map((row) =>
    row.map((cell) => ({
      ...cell,
      entity: cell.entity ? { ...cell.entity } : undefined,
    }))
  );

  let newBoard: GameBoard = {
    ...board,
    cells: newCells,
  };

  for (const enemy of enemies) {
    const enemyCell = findCellByEntityId(newBoard, enemy.id);
    if (!enemyCell) continue;

    let playerCell: Cell | null = null;
    for (const row of newBoard.cells) {
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
      const result = applyDamageToCellInBoard(
        newBoard,
        playerCell.x,
        playerCell.y,
        enemy.attackDamage ?? 1
      );
      newBoard = result.board;

      if (result.updatedPlayer) {
        player = result.updatedPlayer;
      }

      if (result.enemyIdToRemove) {
        enemies = enemies.filter((e) => e.id !== result.enemyIdToRemove);
      }
    } else {
      const strategyName = enemy.moveStrategy ?? "straight";
      const strategy =
        moveStrategies.moveStrategiesMap[strategyName] ??
        moveStrategies.moveStraight;

      const nextPos = strategy(enemy, newBoard);
      if (nextPos) {
        const targetCell = newBoard.cells[nextPos.y]?.[nextPos.x];
        if (targetCell && targetCell.content === "empty") {
          newBoard = swapEntitiesInBoard(
            newBoard,
            enemyCell.x,
            enemyCell.y,
            nextPos.x,
            nextPos.y
          );
        }
      }
    }
  }
  enemies = enemies.filter((enemy) => {
    const cell = findCellByEntityId(newBoard, enemy.id);
    return cell !== null;
  });

  gameBoardStore.set(newBoard);
  enemiesStore.set(enemies);
  playerStore.set(player);
}
