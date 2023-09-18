import React from 'react'
import NotFound from './NotFound';

const Dogs = ({data, loading}) => {

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

    return (
        <div className="photo-container">
            <h2>Dogs</h2>
            <ul>
                {pics}
            </ul>
        </div>
    );
}

export default Dogs