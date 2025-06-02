import type { Building } from "$lib/Stores/types";

export const buildingTemplates: Building[] = [
  {
    id: "stone-wall",
    name: "Каменная стена",
    type: "building",
    hp: 20,
    maxHp: 20,
    image: "/img/buildings/stone-wall.png",
    durationInWaves: 1, 
  },
];