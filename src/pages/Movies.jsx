import{
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill,
} from "react-icons/bs"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

import "./movie.css"

const moviesUrl = import.meta.env.VITE_API
const apikey = import.meta.env.VITE_API_KEY
const videoUrl= import.meta.env.VITE_V

const formatCurrency = (number)=>{
    return number.toLocaleString("pt-US", {
        style: "currency",
        currency: "USD",
    })
}

function Movies(){

    
    const {id} = useParams(); 
    const [movie, setMovie] =useState(null)
    const [videokey, setVideoKey] = useState(null)

    const getMovie = async(url)=>{
        const res = await fetch(url)
        const data =  await res.json()

        setMovie(data)
        // console.log(data.results.key)
    }
    useEffect(()=>{
        const movieUrl = `${moviesUrl}${id}?${apikey}&language=pt-BR`
        getMovie(movieUrl)
        const trailUrl = `${videoUrl}${id}/videos?${apikey}`
        getTrail(trailUrl)
    },[])

    const getTrail = async(url) =>{
        const res = await fetch(url)
        const data = await res.json()
        setVideoKey(data.results[0].key)
    }


    return(
        <div className="movie-page">
            {movie &&(
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
                            <BsGraphUp/> Faturamento
                            </h3>
                            <p>{formatCurrency(movie.revenue)}</p>
                        </div>
                        <div className="info">
                            <h3>
                            <BsHourglassSplit/> Duração
                            </h3>
                            <p>{movie.runtime} Minutos</p>
                        </div>
                        <div className="info description">
                            <h3>
                            <BsFillFileEarmarkTextFill/> Descrição
                            </h3>
                            <p>{movie.overview}</p>
                        </div>
                       
                </>
                
            )}
            <h2>Trailer</h2>
            <iframe src={`https://www.youtube.com/embed/${videokey}`} frameborder="0" allowfullscreen webkitallowfullscreen>
                
            </iframe>

        </div>

    )
}
export default Movies