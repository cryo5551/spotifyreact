import React from 'react';
import { useContextData } from '../../Context/StateProvider';
import './LikedSongTemplate.css';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import SpotifyWebApi from 'spotify-web-api-js';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const LikedSongTemplate = () => {

    const [{ liked_songs,token,current_playing },dispatch] = useContextData();
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(token);

    console.log(liked_songs);

    const likedUris = liked_songs?.items?.map(item => item?.track?.uri);
    const songNames = liked_songs?.items?.map(item => item?.track?.name);


    return (
        <div className='_liked-song-template'>
            <h5>{songNames.join(" ● ").substring(0,180)} ...</h5>
            <h1>Liked Songs</h1>
            <h3>{liked_songs.total} liked songs</h3>



            {(current_playing?.name === "Liked songs") ? <PauseIcon
                className='liked-play-shuffle position'
                onClick={() => {

                    spotify.pause();
                    dispatch({ type: "SET_CURRENT_PLAYING", payload: null });
                }
                } /> :
                <PlayArrowIcon className='liked-play-shuffle position'
                    onClick={() => {
                        dispatch({ type: "SET_URI", payload: likedUris });
                        dispatch({ type: "SET_CURRENT_PLAYING", payload: { ...liked_songs, name: "Liked songs" } })

                        spotify.getMyCurrentPlaybackState().then(state => {
                            (state?.is_playing) ? spotify.pause() : setTimeout(() => {
                                spotify.play()
                            }, 200)
                        })

                    }} />}
        </div>
    )
}

export default LikedSongTemplate