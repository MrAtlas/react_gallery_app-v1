import React, {useEffect} from 'react';
import NotFound from './NotFound';
import { useParams } from 'react-router';

const Photo = ({ data, loading, query, changeQuery }) => {

  const { topic } = useParams();
  let pics;

  if (loading) {
    pics = <p>Loading...</p>;
  } else if (data.length > 0) {
    pics = data.map(pic => {
      let url = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_n.jpg`;
      return <li key={pic.id}><img src={url} alt="" /></li>;
    });
  } else if (data.length === 0) {
    pics = <NotFound />
  }

  useEffect(() => {
    if (topic) {
      changeQuery(topic);
    }
  }, [topic]);

  return (
    <div className="photo-container">
      <h2>{topic ? topic : query}</h2>
      <ul>
        {pics}
      </ul>
    </div>
  );
}

export default Photo;
