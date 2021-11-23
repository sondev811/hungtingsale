export interface IMovieDetail {
    adult: Boolean;
    backdrop_path: String;
    belongs_to_collection: Object;
    budget: Number;
    genres: Array<any>;
    homepage: String;
    id: Number;
    imdb_id: String;
    original_language: String;
    original_title: String;
    overview: String;
    popularity: Number;
    poster_path: String;
    production_companies: Array<any>;
    production_countries: Array<any>;
    release_date: String;
    revenue: Number;
    runtime: Number;
    spoken_languages: Array<any>;
    status: String;
    tagline: String;
    title: String;
    video: Boolean;
    vote_average: Number;
    vote_count: Number;
    seasons: Array<IMovieSeason>
}

interface IMovieSeason {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}
