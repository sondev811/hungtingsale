export const API_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3/',
    ORIGINAL_IMAGE: (path) => `https://image.tmdb.org/t/p/original${path}`,
    W500IMAGE: (path) => `https://image.tmdb.org/t/p/w500${path}`,
    TRAILER_VIDEO: (path) => `https://www.youtube-nocookie.com/embed/${path}`,
    API_KEY: '88d5807254829cdff6bdb90fea9dbefb'
};

export const CATEGORY = {
    MOVIE: 'movie/',
    TV: 'tv/',
    SEARCH: 'search/',
    VIDEOS: '/videos',
    CREDITS: '/credits',
    SIMILAR: '/similar',
    GENRE: 'genre/',
    DISCOVER: 'discover/',
    LIST: '/list'
};

export const MOVIE_TYPE = {
    POPULAR: 'popular',
    TOP_RATE: 'top_rated',
    UP_COMING: 'upcoming'
};

export const TV_TYPE = {
    POPULAR: 'popular',
    TOP_RATE: 'top_rated',
    ON_THE_AIR: 'on_the_air',
    AIRING_TODAY: 'airing_today'
};

export const MOVIE_TYPE_TEXT = {
    popular: 'Trending Movies',
    top_rated: 'Top Rate',
};

export const TV_TYPE_TEXT = {
    popular: 'Trending TV Series',
}

