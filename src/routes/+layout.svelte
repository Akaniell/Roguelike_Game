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
    width: 25%;
  }
  .page-container {
    width: 75%;
    border: 3px solid #000000;
  }
</style>
