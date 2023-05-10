import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter} from "react-router-dom";
import Movies from './pages/Movies.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Category from './pages/category.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path='/' element={<Home />}/>
            <Route path='movies/:id' element={<Movies />}/>
            <Route path='search' element={<Search />}/>
            <Route path='category/:id' element={<Category />} />
          </Route>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
