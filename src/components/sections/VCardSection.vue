<script setup lang="ts">
import VCardsContainer from '@/components/VCardsContainer.vue';
import VCard from '@/components/VCard.vue';
import VButton from '../VButton.vue';
import { gamesStore } from '@/store/games';
import { computed, onMounted, ref } from 'vue';
import { mockData } from '@/mockData'; 
import { useRouter } from 'vue-router';


const router = useRouter();


const isLoading = ref(false);
const store = gamesStore();
const filterValue = ref<'all' | 'liked'>('all');

const games = computed(() => store.games );

const filteredGames = computed(() => {
    return filterValue.value === 'all' ? games.value : 
                                         games.value.filter((game) => game.isLiked);
})

const setFilter = (value: 'all' | 'liked') => {
    value === 'all' ? filterValue.value = 'liked' : filterValue.value = 'all';
}

onMounted(async () => {
    isLoading.value = true;
    await store.setGames();
    isLoading.value = false;
  
})
</script>

<template>
    <section class="card-section">
        <div class="loading" v-if="isLoading">
            Loading card...
        </div>
        <div class="container" v-else>
            <VCardsContainer v-if="games.length > 0">
                <template #filter>
                    <div class="filter">
                        <span class="filter__text">Filter</span>
                        <VButton class="filter__btn" 
                                :size="'lg'"
                                @click="setFilter(filterValue)">{{ filterValue }}</VButton>
                    </div>
                </template>
                <template v-if="filteredGames.length > 0">
                    <VCard class="VCard" 
                            v-for="game in filteredGames" 
                            v-bind="game" 
                            :key="game.title" 
                            @click="router.push(`/game/${game.id}`)"
                            @setLike="store.setLike"
                            @deleteCard="store.deleteCard"
                    />
                </template>
                <p class="no-games-liked" v-else>No liked games</p>
            </VCardsContainer>
            <div v-else>
                <p>Games not found</p>
                <p>But you can try our test card</p>
                <VCard v-bind="mockData" />
            </div>
        </div>
    </section>
</template>

<style scoped>
.VCard{
    transition:all 0.3s ease;
    cursor: pointer;
}

.VCard:hover{
    transform: translateY(-10px);
}

.filter{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.filter__text{
    margin-bottom: 10px;
    font-size: 1.8rem;
    text-transform: uppercase;
}

.no-games-liked{
    font-size: 2rem;
    text-align: center;
    margin: 30px 0;
    font-family: "Rubik", sans-serif;
    text-transform: uppercase;

}

</style>