import { writable } from "svelte/store";
import type { Cell } from "./types";

export const currentCellStore = writable<Cell | null>(null);