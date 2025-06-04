<script lang="ts">
  import { page } from "$app/stores";
  import PlayerDeadModal from "$lib/components/PlayerDeadModal.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";

  const noSidebarPaths = ["/", "/intro"];

  $: showSidebar = !noSidebarPaths.includes($page.url.pathname);
</script>

<div class="container">
  {#if showSidebar}
    <PlayerDeadModal></PlayerDeadModal>
    <div class="sidebar-container">
      <Sidebar />
    </div>
  {/if}
  <div class="page-container">
    <slot />
  </div>
</div>

<style>
  .container {
    display: flex;
    height: 100vh;
    background-image: url("/img/sidebar-bg.png");
    background-repeat: repeat;
    background-position: center center;
    background-size: auto 100%;
  }

  .sidebar-container,
  .page-container {
    border: 3px solid #000000;
    box-sizing: border-box;
  }

  .sidebar-container {
    flex: 0 0 25%;
    max-width: 25%;
    min-width: 25%;
  }

  .page-container {
    flex: 1;
  }
</style>
