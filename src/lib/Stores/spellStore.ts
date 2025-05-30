import { writable } from "svelte/store";

export const selectedSpellName = writable<string | null>(null);
export const selectedElements = writable<string[]>([]);