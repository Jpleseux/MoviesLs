import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./movie.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar } from "react-icons/fa";

const moviesUrl = import.meta.env.VITE_API;
const apikey = import.meta.env.VITE_API_KEY;
const videoUrl = import.meta.env.VITE_V;

const formatCurrency = (number) => {
  return number.toLocaleString("pt-US", {
    style: "currency",
    currency: "USD",
  });
};

const imgUrl = import.meta.env.VITE_IMG;

function Movies() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
  };

  const getTrail = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    if (data.results.length > 0) {
      setVideoKey(data.results[0].key);
    }
  };

  const getSimilar = async () => {
    const res = await fetch(`${moviesUrl}${id}/recommendations?${apikey}&language=pt-br`);
    const data = await res.json();
    const sortedSimilarMovies = data.results.sort((a, b) => b.vote_average - a.vote_average);
    setSimilarMovies(sortedSimilarMovies.slice(0, 4));
  };

  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apikey}&language=pt-br`;
    getMovie(movieUrl);
    const trailUrl = `${videoUrl}${id}/videos?${apikey}&language=pt-br`;
    getTrail(trailUrl);
    getSimilar();
  }, [id]);

  return (
    <div className="movie-page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>

          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Faturamento
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração
            </h3>
            <p>{movie.runtime} Minutos</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
      {videoKey && (
        <>
          <h2>Trailer</h2>
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}`}
            frameBorder="0"
            allowFullScreen
            title="Trailer"
          ></iframe>
        </>
      )}
      {movie && (
        <div>
          <h3>Se você gostou de: "{movie.title}"</h3>
          <br />
          <h4>Talvez Goste de: </h4>
          <div className="row">
            {similarMovies && similarMovies.length > 0 && similarMovies.map((similar, index) => (
              <div key={index} className="col-md-3 mb-4">
                <div className="card">
                  <img className="card-img-top" src={imgUrl + similar.poster_path} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title" style={{color: "white"}}>{similar.title}</h5>
                    <p className="card-text"><FaStar /> {similar.vote_average}</p>
                    <Link to={`/movies/${similar.id}`} className="btn btn-primary">Veja mais sobre</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;
