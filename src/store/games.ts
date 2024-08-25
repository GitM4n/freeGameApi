import {defineStore} from 'pinia';
import {gamesEndpoint, type IGameShort} from '../api/gamesApi';

const {getGames} = gamesEndpoint();

export interface IGameShortWithIsLiked extends IGameShort {
    isLiked: boolean
}



export const gamesStore = defineStore('games', {
    state: () => ({
        games: [] as IGameShortWithIsLiked[],
    }),
    actions: {
        async setGames() {
            this.games = (await getGames()).slice(0, 20).map(g => ({...g, isLiked: false})); 
        },

        setLike(id: number, isLiked: boolean) {
            const idx = this.games.findIndex(g => g.id === id);
            this.games[idx].isLiked = isLiked
        },

        deleteCard(id: number) {
            const idx = this.games.findIndex(g => g.id === id);
            this.games.splice(idx, 1);
        }

    }
})