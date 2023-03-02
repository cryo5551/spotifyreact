import React, { useEffect } from 'react'
import './LikedSongs.css'
import { useContextData } from '../../Context/StateProvider'
// import PlayCircleFilledIcon from '@mui/icons-material/PlayCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Song from '../../Player/Body/Songs/Song';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import SpotifyWebApi from 'spotify-web-api-js';

const LikedSongs = () => {

    const [{ liked_songs, current_playing, token }, dispatch] = useContextData();
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(token);

    const likedUris = liked_songs?.items?.map(item => item?.track?.uri);

    useEffect(() => {
        setTimeout(() => {
            const _path = window.location.pathname;
            dispatch({ type: "SET_PATH", payload: _path.split("%20").join(" ") });
        }, 100)
    }, [])

    return (
        <div>
            <div className='body'>

                <div className='body-info'>
                    <img src="https://i.ibb.co/cyFRk03/Untitled-Design.png" alt='album cover' />

                    <div className='body-info-text'>
                        <strong>PLAYLIST</strong>
                        <h2>Liked songs</h2>
                        <p>Liked and Saved song by Bhawani</p>
                    </div>
                </div>

                <div className='body-songs'>
                    <div className='body-icons'>

                        {(current_playing?.name === "Liked songs") ? <PauseCircleFilledRoundedIcon
                            className='body-play-shuffle'
                            onClick={() => {

                                spotify.pause();
                                dispatch({ type: "SET_CURRENT_PLAYING", payload: null });
                            }
                            } /> :
                            <PlayCircleFilledRoundedIcon className='body-play-shuffle'
                                onClick={() => {
                                    dispatch({ type: "SET_URI", payload: likedUris });
                                    dispatch({ type: "SET_CURRENT_PLAYING", payload: {...liked_songs, name: "Liked songs" }})

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

                    {liked_songs?.items.map((song, i) =>
                        <Song track={song.track} key={i} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default LikedSongs;