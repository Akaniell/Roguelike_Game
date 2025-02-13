<script lang="ts">
    export let text: string = 'Кнопка';
    export let href: string = '/';
</script>

<a href={href}>{text}</a>

<style>
    a{
        width: 250px; 
        height: 65px; 
        background: #2C2C2C; 
        border-radius: 8px; 
        border: 2px #2C2C2C solid; 
        justify-content: center; 
        align-items: center; 
        display: inline-flex;
        color: #F5F5F5; 
        font-size: 24px; 
        cursor: pointer;
    }
</style>