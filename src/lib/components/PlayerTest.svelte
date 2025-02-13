<script lang="ts">
    import { onMount } from 'svelte';
    import { updateEntityState } from '$lib/Stores/entityStore';
    import { entityStore } from '$lib/Stores/entityStore';
    import { Player } from '$lib/Models/player';
  
    let player: Player;
    let playerEntity: { id: number; name: string; health: number; maxHealth: number ; x: number; y: number};
  
    onMount(async () => {
        player = new Player(1,'Игрок',100 ,100);
        const initialEntityState={
            id:player.id,
            name:player.name,
            health:player.health ,
            maxHealth:player.maxHealth ,
            x:0 ,
            y:0 
        };
        updateEntityState(initialEntityState); 
        entityStore.subscribe(($storeValue) => {
            playerEntity = $storeValue; 
            console.log('Состояние сущности изменилось:', playerEntity);
        });
    });

    function dealDamage() {
        player.takeDamage(10);
        console.log(`Нанесено ${10} урона.`);
    }
  
</script>

<div>
    {#if playerEntity}
        <p>Id:{playerEntity.id}</p>
        <p>Имя сущности:{playerEntity.name}</p>
        <p>Здоровье:{playerEntity.health}</p>
        <p>Макс Здоровье:{playerEntity.maxHealth}</p>
    {/if}  
    <button on:click={dealDamage}>Нанести урон (10)</button>
</div>
  