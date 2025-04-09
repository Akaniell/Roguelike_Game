import { writable } from "svelte/store";
import { browser } from "$app/environment";

interface Entity {
  id: number;
  name: string;
  type: 'player' | 'enemy' | 'building';
  position: { x: number; y: number };
}

export interface Player extends Entity {
  
}

export interface Enemy extends Entity {

}

export interface Building {
  type: string;
}

export interface Cell {
  x: number;
  y: number;
  content: 'empty' | 'player' | 'enemy' | 'building';
  entity?: Enemy | Player | Building;
}

export interface GameBoard {
  width: number;
  height: number;
  cells: Cell[][];
}

function localStorageStore<T>(key: string, initialValue: T) {
  const store = writable(initialValue);
  const { subscribe, set, update } = store;

  if (browser) {
    const json = localStorage.getItem(key);
    if (json) {
      set(JSON.parse(json) as T);
    }

    subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return {
    subscribe,
    set,
    update,
  };
}

export const playerStore = localStorageStore<Player>("player", {
  id: 1,
  name: "player",
  type: "player",
  position: { x: 0, y: 0 },
});

export const enemiesStore = localStorageStore<Enemy[]>("enemies", []);

export const gameBoardStore = localStorageStore<GameBoard>('gameBoard', {
  width: 7,
  height: 5,
  cells: Array(5)
    .fill(null)
    .map((_, y) =>
      Array(7)
        .fill(null)
        .map((_, x) => ({ x, y, content: 'empty' }))
    ),
});