import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { useContextData } from '../Context/StateProvider'
import GloblePlayList from '../GloblePlaylistTemplate/GloblePlayList'
import './Library.css'
import LikedSongTemplate from './LikedSongTemplate/LikedSongTemplate'


const Library = () => {


  const spotify = new SpotifyWebApi();
  const [moguMogu, setMoguMogu] = useState();
  const [{ playlists,token}] = useContextData();
  

  

  useEffect(() => {
    spotify.setAccessToken(token)
    spotify.getPlaylist("4mcxGvEVnqLubOFC7OyMXR").then(playlist => setMoguMogu(playlist));
  },[]);

  console.log(moguMogu);
  return (
    <div>

      <h2>Playlists</h2>

      <div className='library-container'>

        <LikedSongTemplate />

        {playlists?.items?.map(playlist => <GloblePlayList playlist={playlist} spotify={spotify} key={playlist.id} />)}
        <GloblePlayList playlist={moguMogu} spotify={spotify}/>
      </div>


    </div>
  )
}

export default Library