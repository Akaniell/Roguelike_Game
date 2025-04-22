<script lang="ts">
  export let content: string;
  export let visible: boolean = false;
  export let position: { top: number; left: number } = { top: 0, left: 0 };
  export let tooltipElement: HTMLElement | null = null;
</script>

<div
  bind:this={tooltipElement}
  class="tooltip {visible ? 'visible' : ''}"
  style="top: {position.top}px; left: {position.left}px;"
  aria-hidden={!visible}
>
  {@html content}
</div>

<style>
  .tooltip {
    position: fixed;
    background: rgba(50, 50, 50, 0.9);
    color: #fff;
    padding: 8px 14px;
    border-radius: 8px;
    white-space: normal;
    z-index: 1000;
    pointer-events: none;
    font-size: 9px;
    line-height: 1.2;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
    transition: opacity 0.15s ease-in-out;
    opacity: 0;
    user-select: none;
    text-align: left;
  }
  .tooltip.visible {
    opacity: 1;
  }
</style>
