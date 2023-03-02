import React from 'react';
import "./RecentlyPlayed.css";

const RecentlyPlayed = ({ item }) => {

  
    return (
        <div className='recently-played-container' >
            <img src={item?.album?.images[1].url} alt="albumCover"  />
            <h4>{(item.name.length > 19) ? item.name.substring(0,19)+"...": item.name}</h4>
            <h5>{item.artists[0].name}</h5>
        </div>
    )
}

export default RecentlyPlayed