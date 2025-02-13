import { writable } from 'svelte/store';

interface EntityState {
  id: number ;
  name: string ;
  health: number ;
  maxHealth: number ;
  x: number;
  y: number;
}

const initialEntityState : EntityState = {
  id :0,
  name:'',
  health :0,
  maxHealth :0,
  x:0,
  y:0
};

export const entityStore = writable<EntityState>(initialEntityState);

export function updateEntityState(newState: EntityState) {
  entityStore.set(newState);
}