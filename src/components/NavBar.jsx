import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {BiCameraMovie, BiSearchAlt2} from "react-icons/bi"


import "./NavBar.css"

const apiKey = import.meta.env.VITE_API_KEY

const genero = import.meta.env.VITE_C


function NavBar(){

  const [categories, setCategories] =useState([])

  const [showCategory, setShowCategory] =useState(false)

  function showbtn(){
    setShowCategory(!showCategory)
  }

  const getCategories = async(url)=>{
    const res = await fetch(url)
    const data = await res.json()
    setCategories(data.genres)
  }

  useEffect(()=>{
    const categoryUrl = `${genero}list?${apiKey}&language=pt-BR`
    getCategories(categoryUrl)
  }, [])

  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    
    if(!search){
      return
    }
    navigate(`/search?q=${search}`)
    setSearch("")
  } 
    return(
        <>
        <nav id="navbar">
        <button onClick={showbtn}>Categorias</button>
          <h2>
          <Link to={"/"} ><BiCameraMovie /> Movies Ls</Link>
          </h2>
          {showCategory &&
        <div className="sidenav">
            {categories.map((category, index)=>
            <Link 
            to={`/category/${category.id}`} 
            key={index} 
            className="btn btn-link"
          >
            {category.name}
          </Link>
            )}
        </div>
          }
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Busque um filme" onChange={(e)=> setSearch(e.target.value)}
            value={search}
            />
            <button type="submit">
                <BiSearchAlt2 />
            </button>
          </form>
        </nav>
        </>
    )
}
export default NavBar