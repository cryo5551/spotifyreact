import React from 'react';
import './Song.css'
import SpotifyWebApi from 'spotify-web-api-js';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useContextData } from '../../../Context/StateProvider';





const Song = ({ track }) => {

  const spotify = new SpotifyWebApi();

  const [state, dispatch] = useContextData();

  const play = () => {
    spotify.setAccessToken(state?.token);
    dispatch({ type: "SET_URI", payload: track.uri });
    dispatch({ type: "SET_CURRENT_PLAYING", payload: track })

    spotify.getMyCurrentPlaybackState().then(state =>{
      (state?.is_playing)? spotify.pause() :setTimeout(()=> {
          spotify.play()
      },200)});
  }

  const pause = () => {
    dispatch({ type: "SET_CURRENT_PLAYING", payload: null })
          spotify.pause();
  }


  return (
    <div className={(state?.current_playing?.id === track.id) ? "current-song" : "songs"}>

      <div className='songs-title' >
        {(state?.current_playing?.id === track.id) ? <PauseIcon onClick={pause} /> : <PlayArrowIcon onClick={play}/>}
        <img src={track?.album?.images[2]?.url} alt="alt" />

        <span>
          <span style={{ fontSize: 15 }}>{(track?.name.length > 30) ? track?.name.substring(0, 30) + "..." : track?.name}</span>
          <br />
          <span style={{ fontSize: 13, color: "rgb(155, 155, 155)" }}>{track?.artists[0]?.name}</span>
        </span>
      </div>

      <div className='songs-info'>
        <span style={{color:'white'}}>{track?.album?.name}</span>
        {/* <span>{time.substring(0,10)}</span> */}
        <span style={{color:'white'}}>{(track?.duration_ms / 1000 / 60).toFixed(2).split(".").join(":")}</span>
      </div>


    </div>
  )
}

export default Song