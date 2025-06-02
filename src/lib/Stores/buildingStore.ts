import { defaultBuildings } from "$lib/data/initialValue";
import { localStorageStore } from "./localStorageStore";
import type { Building } from "./types";

export const buildingsStore = localStorageStore<Building[]>("enemies", defaultBuildings);