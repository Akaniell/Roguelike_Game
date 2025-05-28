<script lang="ts">
  import { goto } from "$app/navigation";
  import { gameBoardStore } from "$lib/Stores/gameBoardStore";
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

  function nextStep() {
    if (step < story.length - 1) {
      step++;
    }
  }

  function selectElement(element: string) {
    if (selectedElements.length === 0) {
      selectedElements = [element];
      step = 6; // рассказ о первой стихии
    } else if (selectedElements.length === 1 && !selectedElements.includes(element)) {
      selectedElements = [...selectedElements, element];
      step = 10; // рассказ о второй стихии
    }
  }

  function startExam() {
    playerStore.update(player => ({
      ...player,
      elements: selectedElements,
      hp: 100,
    }));
    goto("/battle");
  }
</script>

<div class="intro-container">
  {#if step === 4 || step === 8}
    <p>{story[step]}</p>
    <button on:click={nextStep}>Далее</button>
  {:else if step === 5 || step === 9}
    <div class="elements-choice">
      {#each elements.filter(el => !selectedElements.includes(el)) as el}
        <button on:click={() => selectElement(el)}>{el}</button>
      {/each}
    </div>
  {:else if step === 6 || step === 7}
    <p>{elementStories[selectedElements[0]][step - 6]}</p>
    <button on:click={() => step === 7 ? step = 8 : step++}>Далее</button>
  {:else if step === 10 || step === 11}
    <p>{elementStories[selectedElements[1]][step - 10]}</p>
    <button on:click={() => step === 11 ? step = 12 : step++}>Далее</button>
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

<style>
  .intro-container {
    max-width: 600px;
    margin: 2rem auto;
    font-family: "Press Start 2P", cursive, monospace;
    font-size: 1rem;
    text-align: center;
    background-color: red;
  }
  .elements-choice {
    margin: 1rem 0;
  }
</style>
