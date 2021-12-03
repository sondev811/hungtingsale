export interface IMovieDetail {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: object;
    budget: number;
    genres: Array<any>;
    homepage: string;
    name: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<any>;
    production_countries: Array<any>;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Array<any>;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    seasons: Array<IMovieSeason>;
    external_ids?: {
        facebook_id?: number;
        freebase_id?: number;
        freebase_mid?: number;
        imdb_id?: string
        instagram_id?: number;
        tvdb_id?: number
        tvrage_id?: number;
        twitter_id?: number;
    }
}

interface IMovieSeason {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    season_name: string;
}

export interface IRatingInfo {
    bottomRank: number;
    canRate: boolean;
    id: string;
    rating: number;
    ratingCount: number;
    ratingsHistograms: object;
    title: string;
    titleType: string;
    topRank: number;
    year: number;
}
