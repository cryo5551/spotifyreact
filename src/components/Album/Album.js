import React, { useEffect, useState } from 'react';
// import './Playlist.css';
import SpotifyWebApi from 'spotify-web-api-js';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Song from '../Player/Body/Songs/Song';
import { useContextData } from '../Context/StateProvider';


   

const Album = () => {

    const spotify = new SpotifyWebApi();
    const [current_album, setAlbum] = useState();
    const [current_album_tracks, setAlbumTracks] = useState();
    const [{ token, current_playing, playlist_album:album }, dispatch] = useContextData();
    spotify.setAccessToken(token);

console.log(current_album_tracks);

    useEffect(() => {
        if (album?.id) {
            spotify.getAlbum(album?.id)
                .then(e => setAlbum(e));
            spotify.getAlbumTracks(album?.id).then(e=>setAlbumTracks(e));
        }

        setTimeout(() => {
            const _path = window.location.pathname;
            dispatch({ type: "SET_PATH", payload: _path.split("%20").join(" ") });
        }, 100)

    }, []);


  return (
    <div>
    <div className='body'>

        <div className='body-info'>
            <img src={current_album?.images[0]?.url} alt='album cover' />

            <div className='body-info-text'>
                <strong>{current_album?.type.toUpperCase()}</strong>
                {(current_album?.name.length > 30)?<h3>{current_album?.name}</h3>:<h2>{current_album?.name}</h2>}
                
                <p>{current_album?.description}</p>
            </div>
        </div>

        <div className='body-songs'>
            <div className='body-icons'>

                {(current_playing?.id === album?.id) ? <PauseCircleFilledRoundedIcon
    className='body-play-shuffle'
    onClick={() => {
        spotify.getMyCurrentPlaybackState().then(state => {
            if (state?.is_playing) {
                spotify.pause();
                dispatch({ type: "SET_CURRENT_PLAYING", payload: null });
            }
        })
    }} /> :
    <PlayCircleFilledRoundedIcon className='body-play-shuffle'
        onClick={() => {
            dispatch({ type: "SET_URI", payload: album.uri });
            dispatch({ type: "SET_CURRENT_PLAYING", payload: album })

            spotify.getMyCurrentPlaybackState().then(state => {
                (state?.is_playing) ? spotify.pause() : setTimeout(() => {
                    spotify.play()
                }, 500);;
            })

        }} />}
                <FavoriteBorderIcon fontSize='large' sx={{ marginRight: 1 }} />
                <MoreHorizIcon fontSize='large' />
            </div>

            <div className='song-info'>
                <div className='song-info1'>
                    <strong>#</strong>
                    <span>TITLE</span>
                </div>
                <div className='song-info2'>
                    <span>ALBUM</span>
                    <span></span>
                    <AccessTimeIcon />
                </div>

            </div>


            {current_album_tracks?.items.map((song) =>
                <Song track={{...song, album:current_album }} key={song.id} />
            )}

        </div>
    </div>
</div>
  )
}

export default Album