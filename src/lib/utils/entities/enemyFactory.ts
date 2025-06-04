import type { Enemy } from "$lib/Stores/types";
import { enemyTemplates } from "$lib/data/enemyTemplates";

export function createEnemyFromTemplate(template: Enemy): Enemy {
  return {
    ...template,
    id: crypto.randomUUID(),
    hp: template.maxHp,
  };
}

export function createRandomEnemy(): Enemy {
  const randomIndex = Math.floor(Math.random() * enemyTemplates.length);
  return createEnemyFromTemplate(enemyTemplates[randomIndex]);
}
