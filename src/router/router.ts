import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import GameInfoPage from '@/views/GameInfoPage.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        },
        {
            path:'/game/:id',
            name:'game',
            component: GameInfoPage
        },

    ]
});




export default router