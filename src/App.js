import { useEffect, useState } from 'react';
import axios from 'axios';

//components
import NotFound from './components/NotFound';
import Nav from './components/Nav';
import SearchForm from './components/SearchForm'
import Photo from "./components/Photo";

//Api Key
import apiKey from "./components/Config";

//Router
import { Route, Routes, Navigate, useParams, useNavigate } from 'react-router-dom'


/**
 * flickr api 
 * https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3368ae0136038088cf7357f906dd96b1&tags=sunsets&per_page=24&format=json&nojsoncallback=1
 * 
 *`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`
 */

function App() {

  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dogs, setDogs] = useState([]);
  const [cats, setCats] = useState([]);
  const [computers, setComputers] = useState([]);

  const {topic} = useParams();
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

  const changeQuery = (topic) => {
    fetchData(topic);
    navigate(`/search/${topic}`);
  };


  useEffect(() => {
    fetchData(topic);
    console.log(topic)
  }, [topic]);

  return (
    <div className="App">
      <SearchForm changeQuery={changeQuery} />
      <Nav changeQuery={changeQuery} />
      <Routes>
        <Route path="/" element={<Navigate to="search/cats" />} />
        <Route path="search/:topic" element={<Photo loading={loading} data={pics}  />} />
        <Route path="search/dogs" element={<Photo loading={loading} data={dogs} />} />
        <Route path="search/cats" element={<Photo loading={loading} data={cats} />} />
        <Route path="search/computers" element={<Photo loading={loading} data={computers} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
