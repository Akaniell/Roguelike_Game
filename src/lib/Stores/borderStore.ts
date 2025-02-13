import type { Entity } from '$lib/Models/entity';
import { writable } from 'svelte/store';

interface GameFieldState{
    grid: (Entity | null)[][];
    gridSizeX: number;
    gridSizeY: number;
}

const initialGameFieldState : GameFieldState = {
    grid: [],
    gridSizeX: 0,
    gridSizeY: 0
}

export const gameFieldStore = writable<GameFieldState>(initialGameFieldState);

export function updateGameFieldState(newState: GameFieldState) {
    gameFieldStore.set(newState);
}