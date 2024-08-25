

// 1.Authentication: Currently, no authentication is required to access the API. Simply make HTTP requests to the provided endpoints.
// 2.Base URL: The base URL for the API is https://free-to-play-games-database.p.rapidapi.com/api.
// 3.Endpoints: Below are the available endpoints:
//      /games: Retrieve a list of all free-to-play games.
//      /game?id={game_id}: Retrieve details of a specific game by its ID.
//      /games?category={category_name}: Retrieve a list of all available games from a specific genre.
//      /games?platform={platform_name}: Retrieve a list of all available games from a specific platform.
//      /games?sort-by={sort_name}: Sort games by release date, alphabetical or relevance.
// 4.Making Requests: You can make HTTP GET requests to the endpoints using tools like cURL, Postman, or by directly accessing the URLs in your web browser.


export interface IGameShort {
    id: number;
    title: string;
    thumbnail: string;
    short_description: string;
    game_url: string;
    genre: string;
    platform: string;
    publisher: string;
    developer: string;
    release_date: string;
    freetogame_profile_url: string;
  }

  export interface IGame extends IGameShort {
    description: string;
    minimum_system_requirements: MinimumSystemRequirements;
    screenshots: Screenshot[];
  }
  
  export interface Screenshot {
    id: number;
    image: string;
  }
  
  export interface MinimumSystemRequirements {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
}

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'd32c0cea02msh8922d0e216dd687p110080jsne2504e85ad43',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

export const gamesEndpoint = () => {

    async function getGames(): Promise<IGameShort[] | []> {
        try {
            const response = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options);
            const data = await response.json();
            return data
        } catch (error) {
            console.error(error);
            return []
        }
    }


    async function getGameById(id: number): Promise<IGame | undefined> {
        try {
            const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
            const data = await response.json();
            return data
        } catch (error) {
            console.error(error);
            return undefined
        }
    }


    return {
        getGames,
        getGameById
    }
}