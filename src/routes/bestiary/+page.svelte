<script lang="ts">
  import EnemyCard from "$lib/components/EnemyCard.svelte";
  import { enemyTemplates } from "$lib/data/enemyTemplates";
</script>

<h1 class="page-title">Кодекс врагов</h1>

<div class="enemies-list">
  {#each enemyTemplates as enemy}
    <EnemyCard
      name={enemy.name}
      image={enemy.image}
      hp={enemy.hp}
      attackDamage={enemy.attackDamage}
      coinsReward={enemy.coinsReward}
      story={enemy.story ?? "История отсутствует."}
    />
  {/each}
</div>

<style>
  .page-title {
    color: #eee;
    text-align: center;
    margin: 1rem 0;
    font-family: "Press Start 2P", cursive, monospace;
  }

  .enemies-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    padding: 0 1rem 2rem;
  }
</style>
