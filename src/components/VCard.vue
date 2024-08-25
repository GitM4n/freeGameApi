<script setup lang="ts">
import { ref } from 'vue';
import type { IGameShort } from '@/api/gamesApi';
import LikeIcon from '@/assets/icons/LikeIcon.vue';
import DeleteIcon from '@/assets/icons/DeleteIcon.vue';

const $props = defineProps<IGameShort>()

const $emit = defineEmits<{
    (e: 'setLike', id: number, val: boolean): void
    (e: 'deleteCard', id: number): void
}>()

const image = ref<HTMLImageElement | null>(null);
const isLiked = ref<boolean>(false);

const setLike = () => {
    isLiked.value = !isLiked.value
    $emit('setLike', $props.id, isLiked.value);
}

const deleteCard = () => {
    $emit('deleteCard', $props.id)
}

</script>

<template>
    <div class="card">
        <div class="card__inner">
            <div class="card__header">
                <div class="card__platforms">
                    <span class="card__platform">{{ $props.platform }}</span>
                </div>
                <div class="card__img" >
                    <img ref="image" :src="$props.thumbnail" :alt="$props.title">
                </div>
            </div>
            <div class="card__body">
                <h3 class="card__title">{{ $props.title }}</h3>
                <p class="card__description">{{ $props.short_description }}</p>
                <p class="card__publisher"> Publisher: {{ $props.publisher }}</p>
                <p class="card__developer"> Developer: {{ $props.developer }}</p>
            </div>
            <div class="card__footer">
                <div class="card__genres">
                    <span class="card__genre">{{ $props.genre }}</span>
                </div>
                <div class="card__actions">
                    <div class="card__like" @click="setLike">
                        <LikeIcon :is-liked="isLiked" />
                    </div>
                    <div class="card__delete" @click="deleteCard">
                        <DeleteIcon />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card__inner{
    max-width: 260px;
    display: flex;
    flex-direction: column;
    text-align: center;
    
}

.card__platforms{
    background-color: var(--red);
}
.card__platform{
    font-family: "Rubik", sans-serif;
}

.card__img{
    height: 140px;
}

.card__img img{
    width: 100%;
    object-fit: cover;
    object-position: center;
}


.card__body{
    position: relative;
    background-color: var(--accent);
}



.card__body::before{
    content: '';
    display: block;
    position: absolute;
    background-color: var(--accent);
    bottom: calc(100% - 3px);
    left: 0;
    width: 100%;
    height: 20px;
    border-top: 3px solid var(--dark);
    border-radius: 50% 50% 50% 50%  / 100% 100% 0% 0%;
}

.card__title{
    margin: 0;
    font-size: 1.6rem;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}


.card__description{
    font-family: "Rubik", sans-serif;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 20px 0;
    line-height: 1;
}

.card__publisher,
.card__developer{
    font-family: "Rubik", sans-serif;
    font-size: .9rem;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card__genres{
    background-color: var(--red);
}

.card__footer{
    background-color: var(--accent);
 
}

.card__actions{
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding-top: 5px;

}

.card__actions > * {
    cursor: pointer;
}

</style>