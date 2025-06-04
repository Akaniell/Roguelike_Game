import type { SpellCombination } from "$lib/Stores/types";

export const spellCombinations: SpellCombination[] = [
  {
    elements: ["Огонь", "Огонь"],
    spellName: "Огненный шар",
    description: "Мощный шар пламени, наносит 10 урона врагам.",
    damage: 100,
    animation: {
      type: "fireball",
      duration: 300,
    },
  },
  {
    elements: ["Вода", "Вода"],
    spellName: "Исцеляющее касание",
    description: "Восстанавливает 8 здоровья выбранному существу.",
    healing: 8,
    animation: {
      type: "healingFlow",
      duration: 500,
    },
  },
  {
    elements: ["Земля", "Земля"],
    spellName: "Каменная стена",
    description: "Создает каменную стену в выбранной клетке.",
    effect: "Возведение",
  },
  {
    elements: ["Воздух", "Воздух"],
    spellName: "Ураган",
    description: "Сильный ветер, отталкивающий врагов и наносящий 7 урона.",
    effect: "Отталкивание",
    knockback: 2,
    damage: 7,
  },
  {
    elements: ["Огонь", "Вода"],
    spellName: "Паровой взрыв",
    description: "Взрыв горячего пара, наносит 8 урона и оглушает.",
    damage: 8,
    effect: "Оглушение",
  },
  {
    elements: ["Огонь", "Земля"],
    spellName: "Лавовый поток",
    description:
      "Обжигающий поток лавы, наносит 7 урона в зоне и создаёт лаву.",
    damage: 7,
    summon: "Лава",
    duration: 7,
  },
  {
    elements: ["Огонь", "Воздух"],
    spellName: "Пламенный вихрь",
    description: "Отталкивает врага, а так же цели над и под ней.",
    effect: "Отталкивание",
  },
  {
    elements: ["Вода", "Земля"],
    spellName: "Болото",
    description:
      "Создаёт область болота 3×3, наносящую урон всем врагам внутри.",
    summon: "Область - Болото",
    damage: 5,
  },
  {
    elements: ["Вода", "Воздух"],
    spellName: "Эфирный поток",
    description: "Мгновенно переносит заклинателя на выбранную клетку.",
    effect: "Телепортация",
  },
  {
    elements: ["Земля", "Воздух"],
    spellName: "Глыба судьбы",
    description: "Призывает массивный валун, который наносит 8 урона и снижает точность.",
    damage: 8,
    effect: "Снижение точности",
    animation: {
      type: "rock",
      duration: 300,
    },
  },
];
