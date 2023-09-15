import { useEffect, useState, useParams, useNavigate } from 'react';
import axios from 'axios';

//components
import NotFound from './components/NotFound';
import Nav from './components/Nav';
import SearchForm from './components/SearchForm'
import Photo from "./components/Photo";

//Api Key
import apiKey from "./components/Config";

//Router
import {Route, Routes, Navigate} from 'react-router-dom'


/**
 * flickr api 
 * https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3368ae0136038088cf7357f906dd96b1&tags=sunsets&per_page=24&format=json&nojsoncallback=1
 * 
 *`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`
 */

function App() {

  const [pics, setPics] = useState([]);
  const [query, setQuery] = useState('cats');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    let activeFetch = true;
    axios.get(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
    ).then(response => {
      if(activeFetch){
        setPics(response.data.photos.photo)
        setLoading(false)
      }
    })
    .catch(error => {
      console.log("This is the error: ", error)
    })
    return () => {activeFetch = false}
  }, [query]);

  const handleChangeQuery = (searchValue) => {
    setQuery(searchValue);
  }

  return (
    <div className="App">
      <SearchForm changeQuery={handleChangeQuery}/>
      <Nav setQuery={setQuery}/>
      <Routes>
        <Route path="/" element={<Navigate to="/cats" />} /> 
        <Route path="search/:topic" element={<Photo data={pics} />} />
        <Route path="*" element={<NotFound  />} />  
      </Routes>
      
    </div>
  );
}

export default App;
