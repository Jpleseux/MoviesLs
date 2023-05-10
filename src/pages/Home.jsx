import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard";

import "./MovieGrid.css"

const moviesUrl  = import.meta.env.VITE_API
const apikey  = import.meta.env.VITE_API_KEY

function Home(){
    const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesUrl}top_rated?${apikey}&language=pt-BR`;
    getTopRatedMovies(topRatedUrl);
  }, []);

    return(
        <div className="container">
            <h2 className="title">Melhores filmes:
            </h2>
            <div className="movies-container">
            {topMovies.length ===0 && <p>Carregando os filmes</p>}
                {topMovies.length >0 && topMovies.map((movie)=><MovieCard movie={movie} key={movie.id}/>)}
            </div>
        </div>
    )
}
export default Home
