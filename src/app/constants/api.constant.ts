export const API_CONFIG = {
    ORIGINAL_IMAGE: (path) => `https://image.tmdb.org/t/p/original${path}`,
    W500IMAGE: (path) => `https://image.tmdb.org/t/p/w500${path}`,
    TRAILER_VIDEO: (path) => `https://www.youtube-nocookie.com/embed/${path}`
};

export const CATEGORY = {
    MOVIE: 'movie',
    TV: 'tv',
    LIST: '/list',
    SEARCH: '/search',
    VIDEOS: '/videos',
    CREDITS: '/credits',
    SIMILAR: '/similar',
    GENRES: '/genres',
    DISCOVER: '/discover',
    DETAIL: '/detail',
    RATING: '/rating'
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

