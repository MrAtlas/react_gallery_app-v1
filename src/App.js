import { useEffect, useState } from 'react';
import axios from 'axios';

//components
import Nav from './components/Nav';
import SearchForm from './components/SearchForm'
import Photo from "./components/Photo";
import Cats from './components/Cats';
import Dogs from './components/Dogs';
import Computers from './components/Computers';

//Api Key
import apiKey from "./components/Config";

//Router
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import PageNotFound from './components/PageNotFound';



function App() {

  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dogs, setDogs] = useState([]);
  const [cats, setCats] = useState([]);
  const [computers, setComputers] = useState([]);
  const [query, setQuery] = useState('cats');

  const navigate = useNavigate();

  const fetchData = (query) => {
    setLoading(true);
    let activeFetch = true;
    axios.get(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
    ).then(response => {
      if (activeFetch) {
        if (query === "dogs") {
          setDogs(response.data.photos.photo);
        } else if (query === "cats") {
          setCats(response.data.photos.photo);
        } else if (query === "computers") {
          setComputers(response.data.photos.photo);
        } else {
          setPics(response.data.photos.photo)
        }
        setLoading(false);
      }
    })
      .catch(error => {
        console.log("This is the error: ", error);
      });

    return () => { activeFetch = false; }
  };

  const changeQuery = (newQuery) => {
    setQuery(newQuery);
  };


  useEffect(() => {
    fetchData(query);
  }, [query]);

  return (
    <div className="App">
      <SearchForm changeQuery={changeQuery} />
      <Nav changeQuery={changeQuery} />
      <Routes>
        <Route path="/" element={<Navigate to="/cats" replace />} />
        <Route path="/dogs" element={<Dogs data={dogs} loading={loading}/>} />
        <Route path="/cats" element={<Cats data={cats} loading={loading}/>} />
        <Route path="/computers" element={<Computers data={computers} loading={loading}/>} />
        <Route path="/search/:topic" element={<Photo loading={loading} data={pics} query={query} changeQuery={changeQuery} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </div>
  );
}

export default App;
