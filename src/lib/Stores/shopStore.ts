import { writable } from "svelte/store";
import type { ShopItem } from "./types";
import { shopTemplates } from "$lib/data/shopTemplates";
import { localStorageStore } from "./localStorageStore";

export const shopStore = localStorageStore<ShopItem[]>("shopItem",shopTemplates);