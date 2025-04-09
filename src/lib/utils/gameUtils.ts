import {
  playerStore,
  enemiesStore,
  gameBoardStore,
  type Building,
  type Enemy,
  type Player,
} from "$lib/Stores/localstorage";

export function addEnemy(name: string, hp: number) {
  let type = "enemy" as "player" | "enemy" | "building";
  enemiesStore.update((enemies) => {
    const newEnemy = {
      id: Date.now(),
      name,
      type,
      hp,
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
  gameBoardStore.update((board) => {
    const cell = board.cells[y][x];
    console.log(`${cell.x},${cell.y},${cell.entity?.type}`)
    if (cell.entity && cell.entity.hp > 0) {
      cell.entity.hp -= damage;
      if (cell.entity.hp <= 0) {
        cell.content = "empty";
        cell.entity = undefined;
      }
      if (cell.entity?.type === "player") {
        playerStore.update((player) => {
          if (player) {
            player.hp = cell.entity?.hp as number;
          }
          return player;
        });
    } else {
      console.log(`В клетке (${x}, ${y}) нет сущности для нанесения урона.`);
    }
  }
  return board;});
}

export function applyHealToCell(x: number, y: number, heal: number) {
  gameBoardStore.update((board) => {
    const cell = board.cells[y][x];
    console.log(`${cell.x},${cell.y},${cell.entity?.type}`)
    if (cell.entity && cell.entity.hp > 0) {
      cell.entity.hp += heal;
      if (cell.entity.hp <= 0) {
        cell.content = "empty";
        cell.entity = undefined;
      }
      if (cell.entity?.type === "player") {
        playerStore.update((player) => {
          if (player) {
            player.hp = cell.entity?.hp as number;
          }
          return player;
        });
    } else {
      console.log(`В клетке (${x}, ${y}) нет сущности для восстановления хп.`);
    }
  }
  return board;});
}