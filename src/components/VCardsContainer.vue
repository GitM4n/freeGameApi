<script setup lang="ts">

</script>

<template>
    <div class="cards">
        <div class="cards__inner">
            <slot name="filter"></slot>
            <ul class="cards__list">
                <slot></slot>
            </ul>
        </div>
    </div>
</template>

<style scoped>


.cards__list{
    padding: 0;
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

</style>