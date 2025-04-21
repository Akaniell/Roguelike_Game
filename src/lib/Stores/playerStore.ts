import type { Player } from "./types";
import { localStorageStore } from "./localStorageStore";

export const playerStore = localStorageStore<Player>("player", {
  id: 1,
  name: "Игрок",
  type: "player",
  hp: 100,
});
