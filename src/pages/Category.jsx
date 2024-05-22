import { useParams } from "react-router-dom"

import { useState,useEffect, useMemo  } from "react"
import MovieCard from "../components/MovieCard"

import "../pages/MovieGrid.css"
import ReactPaginate from "react-paginate"

function Category(){

    const [categoryMovies, setCategoryMovies] = useState([])
    const [pageData, setPageData] = useState({ total_pages: 0, page: 1 });

    const {id} = useParams()

    const categoryUrlEs = import.meta.env.VITE_CE
    const apiKey = import.meta.env.VITE_API_KEY 
    
    const getCategoryMovies = async(url)=>{
        const res = await fetch(url)
        const data = await res.json()
        setPageData({ ...data });
        setCategoryMovies(data.results)
    }
    async function handlePageChange(e) {
        const selectedPage = e.selected + 1;
        const res = await fetch(`${categoryUrlEs}/discover/movie?${apiKey}&with_genres=${id}&language=pt-BR&page=${selectedPage}`)
        const data = await res.json()
        setCategoryMovies(data.results)
    }
    
    useEffect(()=>{
        const categoryMovieUrl = `${categoryUrlEs}/discover/movie?${apiKey}&with_genres=${id}&language=pt-BR`
        getCategoryMovies(categoryMovieUrl)
    },[])

    return(
        <div className="container-web">
            <h2 className="title"></h2>
            <div className="movies-container-web">
                {categoryMovies.length > 0 && categoryMovies.map((movie, index)=><MovieCard movie={movie} key={index} />
                )}
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
export default Category