<script lang="ts">
  export let content: string;
  export let visible: boolean = false;
  export let position: { top: number; left: number } = { top: 0, left: 0 };
</script>

<div class="tooltip {visible ? 'visible' : ''}" style="top: {position.top}px; left: {position.left}px;">
  {@html content}
</div>

<style>
  .tooltip {
    position: fixed;
    font-family: 'Press Start 2P', cursive;
    font-size: 12px;
    background: #222;
    color: #eee;
    padding: 6px 10px;
    border: 2px solid #555;
    box-shadow: 4px 4px 0 #000;
    border-radius: 0;
    white-space: nowrap;
    user-select: none;
    pointer-events: none;
    image-rendering: pixelated;
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
  }
  .tooltip.visible {
    opacity: 1;
  }
</style>