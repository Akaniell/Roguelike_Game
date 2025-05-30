export const worldName = "Элдарион";

export const lore = [
  "В далёком и загадочном мире Элдарион магия пронизывает всё живое. Здесь каждое дерево, река и камень наполнены древней силой, которая связывает всё сущее в единое целое.",
  "Этот мир пережил Великую Реликтовую Войну — эпоху разрушений и хаоса, когда четыре стихии — Земля, Огонь, Вода и Воздух — боролись за господство. После войны стихии обрели особую силу и гармонию, став основой магического искусства.",
  "Школа магии Арканум была основана великими магами, чтобы обучать молодых учеников искусству управления стихиями. Здесь закаляются характеры, развиваются способности и формируется судьба будущих героев Элдариона.",
  "Ты — молодой ученик этой школы, полный надежд и амбиций. Настал момент, когда тебе предстоит сделать важный выбор — две стихии, которые станут твоими спутниками и источником силы на долгом пути.",
  "После выбора стихий тебя направляют на экзамен в древнюю и таинственную пещеру, где скрывается особый артефакт. Этот предмет станет ключом к твоему дальнейшему обучению и испытаниям, которые ждут впереди.",
  "Пусть удача сопутствует тебе в этом нелёгком путешествии. Помни, что сила — не только в магии, но и в твоём сердце и решимости.",
];

// Тексты рассказов после выбора стихии (по 2 абзаца на стихию)
export const elementStories: Record<string, string[]> = {
  Земля: [
    "Ты долго тренировался с земной стихией, чувствуя силу и устойчивость под ногами.",
    "Решив выбрать её в качестве первой стихии, ты осознаёшь, что она даст тебе крепкую защиту и силу."
  ],
  Огонь: [
    "Пламя огня горит в твоём сердце, и ты учился управлять его яростью и страстью.",
    "Выбрав огонь, ты готов к мощным атакам и стремительным ударам."
  ],
  Вода: [
    "Вода — стихия перемен и гибкости, ты учился её мягкости и силе одновременно.",
    "Это был крайне хороший выбор, она поможет тебе адаптироваться и исцелять."
  ],
  Воздух: [
    "Воздух дарит свободу и скорость, ты тренировался с ветром и лёгкостью.",
    "Выбрав воздух, ты станешь быстрым и неуловимым магом."
  ],
};
