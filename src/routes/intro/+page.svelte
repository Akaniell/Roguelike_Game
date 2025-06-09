<script lang="ts">
  import { goto } from "$app/navigation";
  import { playerStore } from "$lib/Stores/playerStore";
  import { lore, elementStories } from "$lib/data/story";
  import { refreshPlayerEntityInBoard } from "$lib/utils/entities/playerUtils";

  const elements = ["Земля", "Огонь", "Вода", "Воздух"];

  const elementIcons: Record<string, string> = {
    Земля: "/img/elements/earth.png",
    Огонь: "/img/elements/fire.png",
    Вода: "/img/elements/water.png",
    Воздух: "/img/elements/air.png",
  };

  // Вставили шаг с именем после lore[3]
  const story = [
    ...lore.slice(0, 4), // 0-3: вступление
    "Пожалуйста, введи своё имя:", // 4: ввод имени
    "Выбери первую стихию:", // 5: выбор первой стихии
    "", // 6: выбор первой стихии (кнопки)
    "", // 7: история первой стихии 1
    "", // 8: история первой стихии 2
    "Выбери вторую стихию:", // 9: выбор второй стихии
    "", // 10: выбор второй стихии (кнопки)
    "", // 11: история второй стихии 1
    "", // 12: история второй стихии 2
    ...lore.slice(4), // 13+: заключение
  ];

  let step = 0;
  let selectedElements: string[] = [];
  let isTransitioning = false;
  let playerName = "";

  function nextStep() {
    if (step === 4 && playerName.trim() === "") {
      alert("Пожалуйста, введите имя");
      return;
    }
    if (step < story.length - 1) step++;
  }

  function selectElement(element: string) {
    if (selectedElements.length === 0) {
      selectedElements = [element];
      step = 7; // после выбора первой стихии — рассказ о ней
    } else if (
      selectedElements.length === 1 &&
      !selectedElements.includes(element)
    ) {
      selectedElements = [...selectedElements, element];
      step = 11; // после выбора второй стихии — рассказ о ней
    }
  }

  function startExam() {
    playerStore.update((player) => ({
      ...player,
      name: playerName,
      elements: selectedElements,
      hp: 100,
    }));

    refreshPlayerEntityInBoard();

    isTransitioning = true;

    setTimeout(() => {
      goto("/battle");
    }, 400);
  }
</script>

<div class="intro-background" class:is-transitioning={isTransitioning}>
  <div class="intro-container">
    {#if step === 4}
      <p>{story[step]}</p>
      <input
        type="text"
        placeholder="Введите имя"
        bind:value={playerName}
        maxlength="14"
        autocomplete="off"
        autofocus
        class="name-input"
      />
      <button on:click={nextStep}>Далее</button>
    {:else if step === 5}
      <p>{story[step]}</p>
      <button on:click={nextStep}>Далее</button>
    {:else if step === 6}
      <div class="elements-choice">
        {#each elements.filter((el) => !selectedElements.includes(el)) as el}
          <button on:click={() => selectElement(el)}>
            <img src={elementIcons[el]} alt={el} class="element-icon" />
            {el}
          </button>
        {/each}
      </div>
    {:else if step === 7 || step === 8}
      <p>{elementStories[selectedElements[0]][step - 7]}</p>
      <button on:click={() => (step === 8 ? (step = 9) : step++)}>Далее</button>
    {:else if step === 9}
      <p>{story[step]}</p>
      <button on:click={nextStep}>Далее</button>
    {:else if step === 10}
      <div class="elements-choice">
        {#each elements.filter((el) => !selectedElements.includes(el)) as el}
          <button on:click={() => selectElement(el)}>
            <img src={elementIcons[el]} alt={el} class="element-icon" />
            {el}
          </button>
        {/each}
      </div>
    {:else if step === 11 || step === 12}
      <p>{elementStories[selectedElements[1]][step - 11]}</p>
      <button on:click={() => (step === 12 ? (step = 13) : step++)}
        >Далее</button
      >
    {:else if step >= 13}
      <p>{story[step]}</p>
      {#if step === story.length - 1}
        <button on:click={startExam}>Начать экзамен</button>
      {:else}
        <button on:click={nextStep}>Далее</button>
      {/if}
    {:else}
      <p>{story[step]}</p>
      <button on:click={nextStep}>Далее</button>
    {/if}
  </div>
</div>

<style>
  .intro-background {
    background: url("/img/start-screen-bg.png") no-repeat center center;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.4s ease;
    opacity: 1;
  }
  .intro-background.is-transitioning {
    opacity: 0;
  }
  .intro-container {
    max-width: 600px;
    padding: 10px;
    font-family: "Press Start 2P", cursive, monospace;
    font-size: 1rem;
    text-align: center;
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .elements-choice {
    margin: 1rem 0;
  }
  button {
    cursor: pointer;
    border: none;
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin: 2px;
    text-shadow:
      -2px -2px 0 #000,
      2px -2px 0 #000,
      -2px 2px 0 #000,
      2px 2px 0 #000;
  }
  button:hover {
    background-color: rgba(255 255 255 / 0.2);
  }
  .element-icon {
    width: auto;
    height: 24px;
    margin-right: 8px;
    vertical-align: middle;
    filter: drop-shadow(0 0 1px black);
  }
  .name-input {
    width: 350px; 
    height: 65px; 
    background: var(--color-button-bg);
    border: 2px solid var(--color-button-bg);
    border-radius: 0;
    color: var(--color-button-text);
    font-family: var(--font-main);
    font-size: 24px;
    text-align: center;
    box-shadow: 4px 4px 0 var(--color-button-shadow);
    image-rendering: pixelated;
    text-shadow: 1px 1px 0 var(--color-button-shadow);
    outline: none;
    transition:
      background-color 0.1s ease,
      border-color 0.1s ease;
    user-select: text;
    /* Чтобы убрать стандартный внутренний отступ */
    padding: 0;
  }

  .name-input::placeholder {
    color: var(--color-button-text);
    opacity: 0.6;
    text-shadow: none;
  }

  .name-input:focus {
    background: var(--color-button-bg-hover);
    border-color: var(--color-button-bg-hover);
    box-shadow: inset 2px 2px 0 var(--color-button-shadow);
  }
</style>
