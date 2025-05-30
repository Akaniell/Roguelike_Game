<script lang="ts">
  export let name: string;
  export let image: string;
  export let hp: number;
  export let attackDamage: number;
  export let coinsReward: number;
  export let story: string;
</script>

<div class="enemy-card">
  <img class="portrain-gif" src={image} alt={`Изображение ${name}`} />
  <h3>{name}</h3>
  <p class="story">{story}</p>
  <div class="stats">
    <span>HP: {hp}</span>
    <span>Атака: {attackDamage}</span>
    <div class="reward-container">
      <span>Награда: {coinsReward} </span>
      <img src="/img/coin.gif" alt="Монета" class="coin-gif" />
    </div>
  </div>
</div>

<style>
  .enemy-card {
    border: 2px solid #444;
    border-radius: 8px;
    padding: 1rem;
    background-color: #222;
    color: #eee;
    width: 250px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .portrain-gif {
    width: auto;
    height: 100px;
    object-fit: contain;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }
  .enemy-card h3 {
    margin: 0 0 0.5rem 0;
  }
  .enemy-card .story {
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
    line-height: 1;
  }
  .enemy-card .stats {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: small;
    flex-direction: column;
    gap: 10px;
  }
  .coin-gif {
    width: auto;
    height: 14px;
    object-fit: contain;
    display: block;
  }
  .reward-container {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .reward-container span {
    line-height: 1;
    display: inline-flex;
    align-items: center;
  }
</style>
