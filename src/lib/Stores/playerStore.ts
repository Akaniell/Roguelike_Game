import { localStorageStore } from "./localStorageStore";
import { defaultPlayer } from "$lib/data/initialValue";
import type { Player } from "./types";

export const playerStore = localStorageStore<Player>("player", defaultPlayer);
