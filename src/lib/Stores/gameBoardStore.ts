import { localStorageStore } from "./localStorageStore";
import { defaultGameBoard } from "$lib/data/initialValue";
import type { GameBoard } from "./types";

export const gameBoardStore = localStorageStore<GameBoard>("gameBoard", defaultGameBoard);
