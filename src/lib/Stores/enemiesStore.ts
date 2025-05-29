import { localStorageStore } from "./localStorageStore";
import { defaultEnemies } from "$lib/data/initialValue";
import type { Enemy } from "./types";

export const enemiesStore = localStorageStore<Enemy[]>("enemies", defaultEnemies);
