import React from 'react';
import './Song.css'

const Song = ({track}) => {
  return (
    <div className='songs'>


        {/* <span>{key}</span> */}
        <div className='songs-title'>
        <img src={track?.album?.images[2]?.url} alt="alt"/>
        
        <span>
        <span style={{fontSize: 15}}>{(track?.name.length > 30)? track?.name.substring(0,30)+"...":track?.name}</span>
        <br />
        <span style={{fontSize: 13}}>{track?.artists[0]?.name}</span>
        </span>
        </div>

        <div className='songs-info'>
            <span>{track?.album?.name}</span>
            {/* <span>{track?.added_at}</span> */}
            <span>{(track?.duration_ms/1000/60).toFixed(2)}</span>
        </div>
        
        
    </div>
  )
}

export default Song