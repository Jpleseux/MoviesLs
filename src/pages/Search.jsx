import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

const searchUrl = import.meta.env.VITE_SEARCH
const apikey = import.meta.env.VITE_API_KEY

import "./MovieGrid.css"
import ReactPaginate from "react-paginate"

const Search =() =>{
    const [searchParams] = useSearchParams()

    const [movies, setMovies] = useState([])
    const [pageData, setPageData] = useState({ total_pages: 0, page: 1 });

    const query = searchParams.get("q")


    const getSearchMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setPageData({...data})
        setMovies(data.results);
      };
      async function handlePageChange(e) {
        const selectedPage = e.selected + 1;
        const res = await fetch(`${searchUrl}?${apikey}&query=${query}}&language=pt-BR&page=${selectedPage}`)
        const data = await res.json()
        setPageData({...data})
        setMovies(data.results)
    }
    
      useEffect(() => {
        const searchWithQeryUrl = `${searchUrl}?${apikey}&query=${query}}&language=pt-BR`;
        getSearchMovies(searchWithQeryUrl);
      }, [query]);
   

    return(
        <div>
            <div className="container-web">
            <h2 className="title">Resultados para: <span className="query-text">{query}</span>
            </h2>
            <div className="movies-container-web">
            {movies.length ===0 && <h1>Não há correspondencias</h1>}
            
            {movies.length >0 && movies.map((movie)=><MovieCard movie={movie} key={movie.id}/>)}
            </div>
        </div>
            {pageData.total_pages > 0 && (
                <ReactPaginate
                pageCount={pageData.total_pages}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
                />
            )}
        </div>
    )
}
export default Search