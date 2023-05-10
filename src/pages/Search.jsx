import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

const searchUrl = import.meta.env.VITE_SEARCH
const apikey = import.meta.env.VITE_API_KEY

import "./MovieGrid.css"

const Search =() =>{
    const [searchParams] = useSearchParams()

    const [movies, setMovies] = useState([])

    const query = searchParams.get("q")


    const getSearchMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
      };

      useEffect(() => {
        const searchWithQeryUrl = `${searchUrl}?${apikey}&query=${query}}&language=pt-BR`;
        getSearchMovies(searchWithQeryUrl);
      }, [query]);
   

    return(
        <div>
            <div className="container">
            <h2 className="title">Resultados para: <span className="query-text">{query}</span>
            </h2>
            <div className="movies-container">
            {movies.length ===0 && <h1>Não há correspondencias</h1>}
            
                {movies.length >0 && movies.map((movie)=><MovieCard movie={movie} key={movie.id}/>)}
            </div>
        </div>
        </div>
    )
}
export default Search