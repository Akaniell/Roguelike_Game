<script lang="ts">
  import NavButton from "$lib/components/NavButton.svelte";
</script>

<nav>
  <p>Меню</p>
  <NavButton text="Бой" href="/battle"></NavButton>
  <NavButton text="Магазин" href="/shop"></NavButton>
  <NavButton text="Кодекс" href="/bestiary"></NavButton>
  <NavButton text="Выход" href="/"></NavButton>
</nav>

<style>
  p {
    font-size: 48px;
    color: var(--color-button-text);
    margin: 0;
    text-shadow:
      -2px -2px 0 #000,
      2px -2px 0 #000,
      -2px 2px 0 #000,
      2px 2px 0 #000;
  }
  nav {
    padding-top: 30px;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
</style>
