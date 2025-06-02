<script lang="ts">
  import EnemyCard from "$lib/components/EnemyCard.svelte";
  import { enemyTemplates } from "$lib/data/enemyTemplates";
</script>

<p class="page-title">Кодекс врагов</p>

<div class="enemies-list">
  {#each enemyTemplates as enemy}
    <EnemyCard
      name={enemy.name}
      image={enemy.image}
      maxHp={enemy.maxHp}
      attackDamage={enemy.attackDamage}
      coinsReward={enemy.coinsReward}
      story={enemy.story ?? "История отсутствует."}
    />
  {/each}
</div>

<style>
  .page-title {
    font-size: 48px;
    color: #eee;
    text-align: center;
    margin: 1rem 0;
    font-family: "Press Start 2P", cursive, monospace;
    text-shadow:
      -2px -2px 0 #000,
      2px -2px 0 #000,
      -2px 2px 0 #000,
      2px 2px 0 #000;
  }

  .enemies-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    padding: 0 1rem 2rem;
  }
</style>
