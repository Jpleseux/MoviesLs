import { Link } from "react-router-dom"

import {FaStar} from "react-icons/fa"

const imgUrl = import.meta.env.VITE_IMG

// eslint-disable-next-line react/prop-types
function MovieCard({movie, showLink = true}){
   return(
        <div className="movie-card">
            <img src={imgUrl + movie.poster_path} alt={movie.title}/>
            <h2>{movie.title}</h2>
            <p>
            <FaStar /> {movie.vote_average}
            </p>
            {showLink && <Link to={`/movies/${movie.id}`}> Detalhes</Link>}
        </div>
    ) 
}
export default MovieCard