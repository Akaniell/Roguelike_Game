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
    description: "Сильный ветер, сбивающий врагов с ног и отталкивающий их.",
    effect: "Сбивание с ног",
    knockback: 2,
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
      "Обжигающий поток лавы, наносит 5 урона в зоне и создаёт лаву.",
    damage: 5,
    summon: "Лава",
    duration: 7,
  },
  {
    elements: ["Огонь", "Воздух"],
    spellName: "Пламенный вихрь",
    description: "Вихрь огня, наносит 5 урона и поджигает врагов.",
    damage: 5,
    effect: "Поджог",
  },
  {
    elements: ["Вода", "Земля"],
    spellName: "Каменная стена",
    description: "Возводит каменную стену, блокирующую путь врагам.",
    summon: "Каменная стена",
    duration: 20,
  },
  {
    elements: ["Вода", "Воздух"],
    spellName: "Ледяной дождь",
    description: "Дождь из ледяных игл, наносит 9 урона и замораживает.",
    damage: 9,
    effect: "Заморозка",
  },
  {
    elements: ["Земля", "Воздух"],
    spellName: "Песчаная буря",
    description: "Буря из песка, наносит 7 урона и снижает точность врагов.",
    damage: 7,
    effect: "Снижение точности",
  },
];
