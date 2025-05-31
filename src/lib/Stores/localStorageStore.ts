import { writable } from "svelte/store";
import { browser } from "$app/environment";

export function localStorageStore<T>(key: string, initialValue: T) {
  const store = writable(initialValue);
  const { subscribe, set, update } = store;

  if (browser) {
    const json = localStorage.getItem(key);
    if (json) {
      set(JSON.parse(json) as T);
    }

    subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return {
    subscribe,
    set,
    update,
    reset: () => {
      set(initialValue);
      if (browser) {
        localStorage.removeItem(key);
      }
    }
  };
}
