<script lang="ts">
  import { page } from "$app/state";
  import Sidebar from "$lib/components/Sidebar.svelte";

  let { children } = $props();
</script>

<div class="container">
  {#if page.url.pathname !== "/"}
    <div class="sidebar-container">
      <Sidebar></Sidebar>
    </div>
  {/if}
  <div class="page-container">
    {@render children()}
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
  .sidebar-container {
    border: 3px solid #000000;
    flex: 0 0 25%; 
    max-width: 25%;
    min-width: 25%;
    box-sizing: border-box; 
  }
  .page-container {
    flex: 1; 
    border: 3px solid #000000;
    box-sizing: border-box;
    overflow-y: auto; 
  }
</style>
