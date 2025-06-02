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

  const story = [
    ...lore.slice(0, 4),
    "Выбери первую стихию:",
    "",
    "",
    "",
    "Выбери вторую стихию:",
    "",
    "",
    "",
    ...lore.slice(4),
  ];

  let step = 0;
  let selectedElements: string[] = [];
  let isTransitioning = false;

  function nextStep() {
    if (step < story.length - 1) step++;
  }

  function selectElement(element: string) {
    if (selectedElements.length === 0) {
      selectedElements = [element];
      step = 6;
    } else if (
      selectedElements.length === 1 &&
      !selectedElements.includes(element)
    ) {
      selectedElements = [...selectedElements, element];
      step = 10;
    }
  }

  function startExam() {
    playerStore.update((player) => ({
      ...player,
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
    {#if step === 4 || step === 8}
      <p>{story[step]}</p>
      <button on:click={nextStep}>Далее</button>
    {:else if step === 5 || step === 9}
      <div class="elements-choice">
        {#each elements.filter((el) => !selectedElements.includes(el)) as el}
          <button on:click={() => selectElement(el)}>
            <img src={elementIcons[el]} alt={el} class="element-icon" />
            {el}
          </button>
        {/each}
      </div>
    {:else if step === 6 || step === 7}
      <p>{elementStories[selectedElements[0]][step - 6]}</p>
      <button on:click={() => (step === 7 ? (step = 8) : step++)}>Далее</button>
    {:else if step === 10 || step === 11}
      <p>{elementStories[selectedElements[1]][step - 10]}</p>
      <button on:click={() => (step === 11 ? (step = 12) : step++)}
        >Далее</button
      >
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
</style>
