<script setup lang="ts">
import HeaderLayout from '@/layouts/HeaderLayout.vue';
import {gamesEndpoint, type IGame} from '@/api/gamesApi';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { splitToParagraphs } from '@/utils/splitToParagraphs';
import VSlider from '@/components/VSlider.vue';

const route = useRoute();

const {getGameById} = gamesEndpoint();
const game = ref<IGame>();

const activeIdxSlider = ref<number|undefined>();



onMounted(async() =>{
    game.value = await getGameById(+route.params.id);
})

</script>

<template>
    <div class="game-info" v-if="game">
        <HeaderLayout>
            <h1 class="header__title">{{game.title}}</h1>
        </HeaderLayout>
        <div class="game-info__inner">
            <div class="game-info__row _head">
                <div class="game-info__img">
                    <img :src="game.thumbnail" :alt="game.title">
                </div>
                <div class="game-info__description" 
                    v-html="splitToParagraphs(game.description)">
                </div>
            </div>
            <div class="game-info__row">
                <div class="game-info__col">
                    <div class="game-info__genre">
                        <h3 class="game-info__title">Genre</h3>
                        <p>{{game.genre}}</p>
                    </div>
                    <div class="game-info__platforms">
                        <h3 class="game-info__title">Platforms</h3>
                        <p>{{game.platform}}</p>
                    </div>  
                    <div class="game-info__publisher">
                        <h3 class="game-info__title">Publisher</h3>
                        <p>{{game.publisher}}</p>
                    </div>
                    <div class="game-info__developer">
                        <h3 class="game-info__title">Developer</h3>
                        <p>{{game.developer}}</p>
                    </div>
                    <div class="game-info__release-date">
                        <h3 class="game-info__title">Release date</h3>
                        <p>{{game.release_date}}</p>
                    </div>
                </div>
                <div class="game-info__col">
                    <div class="game-info__min-sys-req" v-if="game.minimum_system_requirements">
                        <h3 class="game-info__title">Minimum system requirements</h3>
                        <ul class="game-info__sys-req-list">
                            <li class="game-info__sys-req-item" 
                                :key="value[0]"
                                v-for="value in Object.entries(game.minimum_system_requirements)">
                                <p><strong>{{ value[0] }}:</strong> {{ value[1] }}</p>
                            </li>
                        </ul>
                    </div>
                    <h3 v-else>Requirements undefined</h3>
                </div>
            </div>
            <div class="game-info__row">
                <div class="game-info__screenshots">
                    <h3 class="game-info__title">Screenshots</h3>
                    <ul class="game-info__screenshots-list">
                        <li class="game-info__screenshots-item" 
                            :key="screenshot.id"
                            v-for="screenshot, idx in game.screenshots"
                            @click="activeIdxSlider = idx">
                            <img :src="screenshot.image" :alt="game.title">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      <VSlider v-if="activeIdxSlider !== undefined" 
                :images="game.screenshots" 
                :idx="activeIdxSlider"
                @close="activeIdxSlider = undefined"/>
    </div>
</template>

<style scoped>
h3, p{
    margin: 0;
    line-height: 1.3;
}

ul{
    list-style: none;
    padding: 0;
}

strong{
    text-transform: capitalize;
}

.game-info__title{
    font-size: 1.5rem;
}

.game-info__inner {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.game-info__row{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    background-color: var(--accent);
    padding: 20px;
    border-radius: 10px;
}


._head{
    display:block;   
}

.game-info__img{
    float: left;
    margin-right: 20px;
}

.game-info__img img{
    border-radius: 10px;
}

.game-info__description{
    font-family: 'Rubik', sans-serif;
    font-size: 1.2rem;
    text-align: justify; 
    margin-top: 0; 
}

.game-info__description *{
    margin-bottom: 10px;
}

.game-info__genre,
.game-info__platforms,
.game-info__publisher,
.game-info__developer,
.game-info__release-date{
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
}


.game-info__min-sys-req{
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 1.4rem;
}

.game-info__screenshots-list{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.game-info__screenshots-item{
    width: 600px;
}

.game-info__screenshots-item img{
    width: 100%;
}
</style>