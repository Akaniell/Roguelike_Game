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

    if (cell.entity && cell.entity.hp > 0) {
      switch (cell.entity.type) {
        case "player":
          playerStore.update((player) => {
            if (player) {
              player.hp -= damage;
              if (cell.entity) cell.entity.hp = player.hp; 
              if (player.hp <= 0) {
                console.log(`Игрок на клетке (${x}, ${y}) был повержен!`);
                cell.content = "empty";
                cell.entity = undefined;
              }
            }
            return { ...player };
          });
          break;

        case "enemy":
          enemiesStore.update((enemies) => {
            return enemies.map((enemy) => {
              if (enemy.id === cell.entity?.id) {
                enemy.hp -= damage;
                cell.entity.hp = enemy.hp; 

                if (enemy.hp <= 0) {
                  console.log(
                    `Враг (${enemy.name}) на клетке (${x}, ${y}) был повержен!`
                  );
                  cell.content = "empty";
                  cell.entity = undefined;
                }
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
        `Сущности (${cell.entity.name}) на клетке (${x}, ${y}) нанесен урон. HP: ${cell.entity.hp}`
      );
    } else {
      console.log(`В клетке (${x}, ${y}) нет сущности для нанесения урона.`);
    }

    return board;
  });
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
