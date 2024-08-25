<script setup lang="ts">

interface Props {
    size?: 'sm' | 'md' | 'lg';
}

const $props=withDefaults(defineProps<Props>(), {
    size: 'md'
})

</script>

<template>
        <button class="button">
            <span class="button__text" 
                  :style="{
                    fontSize: $props.size === 'sm' ? '12px' : 
                    $props.size === 'md' ? '16px' : '20px'
                  }"    
            >
                <slot></slot>
            </span>
        </button>
</template>

<style scoped>

.button{
    outline: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    background-color: var(--red);
    border-radius: 5px;
    cursor: pointer;
}

.button__text{
    color: var(--light);
    font-weight: 600;
    text-transform: uppercase;
}

</style>