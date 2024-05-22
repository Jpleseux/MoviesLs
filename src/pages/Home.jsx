import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import ReactPaginate from "react-paginate";
import "./MovieGrid.css";

const moviesUrl = import.meta.env.VITE_API;
const apikey = import.meta.env.VITE_API_KEY;

function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const [pageData, setPageData] = useState({ total_pages: 0, page: 1 });

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setPageData({ ...data });
    setTopMovies(data.results);
  };

  async function handlePageChange(e) {
    const selectedPage = e.selected + 1;
    const topRatedUrl = `${moviesUrl}top_rated?${apikey}&language=pt-BR&page=${selectedPage}`;
    await getTopRatedMovies(topRatedUrl);
  }

  useEffect(() => {
    const topRatedUrl = `${moviesUrl}top_rated?${apikey}&language=pt-BR`;
    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <div className="container-web">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container-web">
        {topMovies.length === 0 && <p>Carregando os filmes</p>}
        {topMovies.length > 0 && topMovies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
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
  );
}

export default Home;
