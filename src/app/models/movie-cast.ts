export interface IMovieCredits {
    cast: Array<IMovieCast>;
    crew: Array<IMovieCrew>;
    id: Number;
}

export interface IMovieCast {
    adult: Boolean;
    cast_id: Number;
    character: String;
    credit_id: String;
    gender: Number;
    id: Number;
    known_for_department: String;
    name: String;
    order: Number;
    original_name: String;
    popularity: Number;
    profile_path: String;
}

export interface IMovieCrew {
    adult: Boolean;
    credit_id: String;
    department: String;
    gender: Number;
    id: Number;
    job: String;
    known_for_department: String;
    name: String;
    original_name: String;
    popularity: Number;
    profile_path: String;
}