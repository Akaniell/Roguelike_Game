import { writable } from "svelte/store";
import type { ShopItem } from "./types";
import { shopTemplates } from "$lib/data/shopTemplates";

export const shopStore = writable<ShopItem[]>(shopTemplates);