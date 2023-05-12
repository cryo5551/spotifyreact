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


   

const Artist = () => {

    const spotify = new SpotifyWebApi();
    const [current_Artist, setArtist] = useState();
    const [current_Artist_tracks, setArtistTracks] = useState();
    const [{ token, current_playing, playlist_album:artist }, dispatch] = useContextData();
    spotify.setAccessToken(token);

console.log(current_Artist_tracks);

    useEffect(() => {
        if (artist?.id) {
            spotify.getArtist(artist?.id)
                .then(e => setArtist(e));
            spotify.getArtistTopTracks(artist?.id).then(e=>setArtistTracks(e));
        }

        setTimeout(() => {
            const _path = window.location.pathname;
            dispatch({ type: "SET_PATH", payload: _path.split("%20").join(" ") });
        }, 100)

    }, []);

    console.log(current_Artist_tracks);


  return (
    <div>
    <div className='body'>

        <div className='body-info'>
            <img src={current_Artist?.images[0]?.url} alt='artist cover' />

            <div className='body-info-text'>
                <strong>{current_Artist?.type.toUpperCase()}</strong>
                {(current_Artist?.name.length > 30)?<h3>{current_Artist?.name}</h3>:<h2>{current_Artist?.name}</h2>}
                
                <p>{current_Artist?.description}</p>
            </div>
        </div>

        <div className='body-songs'>
            <div className='body-icons'>

                {(current_playing?.id === artist?.id) ? <PauseCircleFilledRoundedIcon
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
            dispatch({ type: "SET_URI", payload: artist.uri });
            dispatch({ type: "SET_CURRENT_PLAYING", payload: artist })

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


            {current_Artist_tracks?.items.map((song) =>
                <Song track={{...song, artist:current_Artist }} key={song.id} />
            )}

        </div>
    </div>
</div>
  )
}

export default Artist