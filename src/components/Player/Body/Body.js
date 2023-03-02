import React, { useEffect, useState } from 'react';
import './Body.css';

import SpotifyWebApi from 'spotify-web-api-js';
import { useContextData } from '../../Context/StateProvider';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Song from './Songs/Song';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Body = ({ playlist }) => {

    const spotify = new SpotifyWebApi();
    const [current_playlist, setPlaylist] = useState();
    const [{ token, current_playing }, dispatch] = useContextData();
    spotify.setAccessToken(token);


    useEffect(() => {
        if (playlist?.id) {
            spotify.getPlaylist(playlist?.id)
                .then(e => setPlaylist(e));
        }

        setTimeout(() => {
            const _path = window.location.pathname;
            dispatch({ type: "SET_PATH", payload: _path.split("%20").join(" ") });
        }, 100)

    }, [])

    return (
        <div className='body'>
            {/* <Header/> */}

            <div className='body-info'>
                <img src={current_playlist?.images[0]?.url} alt='album cover' />

                <div className='body-info-text'>
                    <strong>PLAYLIST</strong>
                    <h2>{current_playlist?.name}</h2>
                    <p>{current_playlist?.description}</p>
                </div>
            </div>

            <div className='body-songs'>
                <div className='body-icons'>

                    {(current_playing?.id === playlist?.id) ? <PauseCircleFilledRoundedIcon
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
                                dispatch({ type: "SET_URI", payload: playlist.uri });
                                dispatch({ type: "SET_CURRENT_PLAYING", payload: playlist })

                                spotify.getMyCurrentPlaybackState().then(state => {
                                    (state?.is_playing) ? spotify.pause() : setTimeout(() => {
                                        spotify.play()
                                    }, 500);;
                                })

                            }} />}
                    <FavoriteBorderIcon fontSize='large' sx={{ marginRight: 1 }} />
                    <MoreHorizIcon fontSize='large' />
                </div>
                {/* list of songs */}

                {/* <div className='song-info'>
                <div className='song-info1'>
                    <strong>#</strong>
                    <span>TITLE</span>
                </div>
                <div className='song-info2'>
                    <span>ALBUM</span>
                    <span></span>
                <AccessTimeIcon/>
                </div>
                
            </div> */}

                {/* <div className='body-tracks'> */}
                {current_playlist?.tracks.items.map((song, i) =>
                    <Song track={song.track} key={i} />
                )}
                {/* </div> */}
            </div>
        </div>
    )
}

export default Body;