import type { Enemy } from "./types";
import { localStorageStore } from "./localStorageStore";

export const enemiesStore = localStorageStore<Enemy[]>("enemies", []);
