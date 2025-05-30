<script lang="ts">
  import { goto } from "$app/navigation";
  import { playerStore } from "$lib/Stores/playerStore";
  import { lore, elementStories } from "$lib/data/story";

  const elements = ["Земля", "Огонь", "Вода", "Воздух"];

  const story = [
    ...lore.slice(0, 4),       // 0..3
    "Выбери первую стихию:",   // 4 - текст + далее
    "",                        // 5 - выбор первой стихии (кнопки)
    "",                        // 6 - рассказ 1 стихии, абзац 1
    "",                        // 7 - рассказ 1 стихии, абзац 2
    "Выбери вторую стихию:",   // 8 - текст + далее
    "",                        // 9 - выбор второй стихии (кнопки)
    "",                        // 10 - рассказ 2 стихии, абзац 1
    "",                        // 11 - рассказ 2 стихии, абзац 2
    ...lore.slice(4),          // 12..13 - заключение
  ];

  let step = 0;
  let selectedElements: string[] = [];
  let isTransitioning = false;

  function nextStep() {
    if (step < story.length - 1) {
      step++;
    }
  }

  function selectElement(element: string) {
    if (selectedElements.length === 0) {
      selectedElements = [element];
      step = 6; // рассказ о первой стихии
    } else if (
      selectedElements.length === 1 &&
      !selectedElements.includes(element)
    ) {
      selectedElements = [...selectedElements, element];
      step = 10; // рассказ о второй стихии
    }
  }

  function startExam() {
    playerStore.update((player) => ({
      ...player,
      elements: selectedElements,
      hp: 100,
    }));

    isTransitioning = true;

    setTimeout(() => {
      goto("/battle");
    }, 400); // время совпадает с длительностью CSS-перехода
  }
</script>

<div class="intro-background" class:is-transitioning={isTransitioning}>
  <div class="intro-container">
    {#if step === 4 || step === 8}
      <p>{story[step]}</p>
      <button on:click={nextStep}>Далее</button>
    {:else if step === 5 || step === 9}
      <div class="elements-choice">
        {#each elements.filter((el) => !selectedElements.includes(el)) as el}
          <button on:click={() => selectElement(el)}>{el}</button>
        {/each}
      </div>
    {:else if step === 6 || step === 7}
      <p>{elementStories[selectedElements[0]][step - 6]}</p>
      <button on:click={() => (step === 7 ? (step = 8) : step++)}>Далее</button>
    {:else if step === 10 || step === 11}
      <p>{elementStories[selectedElements[1]][step - 10]}</p>
      <button on:click={() => (step === 11 ? (step = 12) : step++)}>Далее</button>
    {:else if step >= 12}
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
    font-weight: bold;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
</style>
