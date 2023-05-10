import { useParams } from "react-router-dom"

import { useState,useEffect  } from "react"
import MovieCard from "../components/MovieCard"

import "../pages/MovieGrid.css"

function Category(){

    const [categoryMovies, setCategoryMovies] = useState([])

    const {id} = useParams()

    const categoryUrlEs = import.meta.env.VITE_CE
    const apiKey = import.meta.env.VITE_API_KEY 
    
    const getCategoryMovies = async(url)=>{
        const res = await fetch(url)
        const data = await res.json()
        setCategoryMovies(data.results)
    }

    useEffect(()=>{
        const categoryMovieUrl = `${categoryUrlEs}/discover/movie?${apiKey}&with_genres=${id}&language=pt-BR`
        console.log(categoryMovieUrl)
        getCategoryMovies(categoryMovieUrl)
    },[])

    return(
        <div className="container">
            <h2 className="title"></h2>
            <div className="movies-container">
                {categoryMovies.length > 0 && categoryMovies.map((movie)=><MovieCard movie={movie} key={movie.id} />
                )}
            </div>
        </div>
    )
}
export default Category