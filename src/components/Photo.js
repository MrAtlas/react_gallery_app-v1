import React from 'react'
import NotFound from './NotFound';

const Photo = props => {

    const results = props.data;
    let pics;

    if(results.length > 0){
        pics = results.map(pic => {
            let url = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_n.jpg`;
            return <li key={pic.id}><img src={url} alt="" /></li>;
        })
    }else{
        pics = <NotFound />
    }

  return (
    <>
        <div className="photo-container">
        <h2>Results</h2>
        <ul>
            {pics}
        </ul>
      </div>
    </>
  )
}

export default Photo