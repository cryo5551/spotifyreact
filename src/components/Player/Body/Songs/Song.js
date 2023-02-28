import React from 'react';
import './Song.css'
import SpotifyWebApi from 'spotify-web-api-js';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PauseIcon from '@mui/icons-material/Pause';
import { useContextData } from '../../../Context/StateProvider';


  


const Song = ({track}) => {

  const spotify = new SpotifyWebApi();

  const [{token}] = useContextData();

  const playPause = () => {
    spotify.setAccessToken(token);
    spotify.play();
  }
  return (
    <div className='songs'>

        {/* <span>{key}</span> */}
        <div className='songs-title' >
        <PlayArrowIcon/>
        <img src={track?.album?.images[2]?.url} alt="alt" onclick={playPause}/>
        
        <span>
        <span style={{fontSize: 15}}>{(track?.name.length > 30)? track?.name.substring(0,30)+"...":track?.name}</span>
        <br />
        <span style={{fontSize: 13}}>{track?.artists[0]?.name}</span>
        </span>
        </div>

        <div className='songs-info'>
            <span>{track?.album?.name}</span>
            {/* <span>{time.substring(0,10)}</span> */}
            <span>{(track?.duration_ms/1000/60).toFixed(2).split(".").join(":")}</span>
        </div>
        
        
    </div>
  )
}

export default Song