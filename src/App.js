import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Cards from "./components/Cards/Cards";
import Pagination from "./components/Pagination/Pagination";
import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardDetails from "./components/Cards/CardDetails";

function App(){
  return(
    <Router>
      <div className="App">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CardDetails />} />
      </Routes>

    </Router>
  );
}

const Home = () => {

  const [pageNumber, setPageNumber] = useState(1);

  const [search, setSearch] = useState("");

  const [fetchedData, updateFetchedData] = useState([]);

  const { info, results } = fetchedData;

  const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name${search}`;

  useEffect( () => {
    (async function(){
      const data = await fetch(api)
      .then(response => response.json())
      updateFetchedData(data);
    })()  
  }, [api])

  return (
    <div className="App">

      <h1 className="text-center mb-4">Characters</h1>

      <Search setPageNumber={setPageNumber} setSearch={setSearch} />

      <div className="container">
        <div className="row">
          <div className="col-14">
            <div className="row">
              <Cards page="/" results={results} />
            </div>
          </div>
        </div>
      </div>
      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
    </div>
  );
}

export default App;
