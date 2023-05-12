import React, { useState } from 'react';
import "./PlaylistTemplate.css";
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import { useContextData } from '../Context/StateProvider';
import SpotifyWebApi from 'spotify-web-api-js';
import { useNavigate } from 'react-router-dom';


const PlaylistTemplate = ({ item }) => {

    const navigate = useNavigate();
    const spotify = new SpotifyWebApi();
    const [{ token, current_playing }, dispatch] = useContextData();
    const [isMouseIn, setIsMouseIn] = useState(false);
    spotify.setAccessToken(token);

    const nevigateAndDispath = () => {
        navigate(`/${item?.name}`)
    }

    return (
        <div className='playlists'
            onMouseEnter={() => setIsMouseIn(true)}
            onMouseLeave={() => setIsMouseIn(false)}
        >

            <img src={item?.images[0]?.url} alt="playlist" onClick={nevigateAndDispath} />
            <h3 onClick={() => navigate(`/${item?.name}`)}>{item?.name}</h3>

            {(current_playing?.name === item?.name) ? <PauseCircleFilledRoundedIcon className='show-icon'
                onClick={() => {
                    spotify.getMyCurrentPlaybackState().then(state => {
                        if (state?.is_playing) {
                            spotify.pause();
                            dispatch({ type: "SET_CURRENT_PLAYING", payload: null });
                        }

                        else {
                            dispatch({ type: "SET_CURRENT_PLAYING", payload: item })
                            setTimeout(() => {
                                spotify.play()
                            }, 400);;
                        }

                    })
                }} /> :
                <PlayCircleFilledRoundedIcon className={isMouseIn ? "show-icon " : "hide-icon"}
                    onClick={() => {
                        dispatch({ type: "SET_URI", payload: item.uri });
                        dispatch({ type: "SET_CURRENT_PLAYING", payload: item })

                        spotify.getMyCurrentPlaybackState().then(state => {
                            (state?.is_playing) ? spotify.pause() : setTimeout(() => {
                                spotify.play()
                            }, 400);;
                        })

                    }} />}
        </div>
    )
}

export default PlaylistTemplate