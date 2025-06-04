<script lang="ts">
  import type { SpellAnimation } from "$lib/Stores/types";

  export let animations: SpellAnimation[] = [];

  export let onDone: (id: string) => void;

  function handleAnimationEnd(id: string) {
    if (onDone) onDone(id);
  }
</script>

<div class="spell-animation-layer">
  {#each animations as anim (anim.id)}
    {#if anim.type === "fireball"}
      <div
        class="fireball"
        style="
            left: {anim.startX}px;
            top: {anim.startY}px;
            --start-x: {anim.startX}px;
            --start-y: {anim.startY}px;
            --target-x: {anim.endX}px;
            --target-y: {anim.endY}px;
            animation-duration: {anim.duration}ms;"
        on:animationend={() => handleAnimationEnd(anim.id)}
      ></div>
    {/if}
    {#if anim.type === "healingFlow"}
      <div
        class="healing-flow"
        style="
            left: {anim.startX}px;
            top: {anim.startY}px;
            --start-x: {anim.startX}px;
            --start-y: {anim.startY}px;
            --target-x: {anim.endX}px;
            --target-y: {anim.endY}px;
            animation-duration: {anim.duration}ms;"
        on:animationend={() => handleAnimationEnd(anim.id)}
      ></div>
    {/if}
    {#if anim.type === "hurricane"}
      <div
        class="hurricane"
        style="
      left: {anim.startX}px;
      top: {anim.startY}px;
      --start-x: {anim.startX}px;
      --start-y: {anim.startY}px;
      --target-x: {anim.endX}px;
      --target-y: {anim.endY}px;
      animation-duration: {anim.duration}ms;"
        on:animationend={() => handleAnimationEnd(anim.id)}
      ></div>
    {/if}
  {/each}
</div>

<style>
  .spell-animation-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .fireball {
    position: absolute;
    width: 32px;
    height: 32px;
    background: url("/img/spells/fireball.png") no-repeat;
    background-size: contain;
    pointer-events: none;
    animation: fireballMove linear forwards;
  }

  @keyframes fireballMove {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(
        calc(var(--target-x) - var(--start-x, 0px)),
        calc(var(--target-y) - var(--start-y, 0px))
      );
    }
  }

  .healing-flow {
    position: absolute;
    width: 32px;
    height: 32px;
    background: url("/img/spells/healingFlow.png") no-repeat;
    background-size: contain;
    pointer-events: none;
    animation: healingFlowMove linear forwards;
  }

  @keyframes healingFlowMove {
    from {
      transform: translate(0, 0) rotate(0deg);
      opacity: 1;
    }
    to {
      transform: translate(
          calc(var(--target-x) - var(--start-x, 0px)),
          calc(var(--target-y) - var(--start-y, 0px))
        )
        rotate(720deg);
      opacity: 0.7;
    }
  }

  .hurricane {
    position: absolute;
    width: 48px;
    height: 48px;
    background: url("/img/spells/hurricane.png") no-repeat;
    background-size: contain;
    pointer-events: none;
    animation: hurricaneMove linear forwards;
  }

  @keyframes hurricaneMove {
    from {
      transform: translate(0, 0) rotate(0deg);
      opacity: 1;
    }
    to {
      transform: translate(
          calc(var(--target-x) - var(--start-x, 0px)),
          calc(var(--target-y) - var(--start-y, 0px))
        )
        rotate(720deg);
      opacity: 0.7;
    }
  }
</style>
