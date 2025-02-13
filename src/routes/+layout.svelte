<script lang="ts">
    import { page } from '$app/state';
    import Sidebar from '$lib/components/Sidebar.svelte';

    let { children } = $props();
</script>

<div class="container">
    {#if page.url.pathname !== '/'}
        <div class="sidebar-container">
            <Sidebar></Sidebar>
        </div>    
    {/if}
    <div class="page-container">
        {@render children()}
    </div>
</div>

<style>
    .container{
        display: flex;
    }
    .sidebar-container {
        width: 25%;
        margin-top: 30px;
    }
    .page-container{
        width: 75%;
    }
</style>