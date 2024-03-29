import React, { useState } from 'react';
import "./GloblePlaylist.css"
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import { useContextData } from '../Context/StateProvider';
import { useNavigate } from 'react-router-dom';


const GloblePlayList = ({ playlist, spotify }) => {

    const [{ current_playing }, dispatch] = useContextData();
    const [isMouseIn, setIsMouseIn] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='globle-playlist' onMouseEnter={() => setIsMouseIn(true)} onMouseLeave={() => setIsMouseIn(false)} >
            <img src={playlist?.images[0]?.url} alt="albumCover" onClick={() => navigate(`/${playlist?.name}`)} />
            <h4>{(playlist?.name?.length > 16) ? playlist?.name.substring(0, 16) + "..." : playlist?.name}</h4>
            <h5>{playlist?.name?.substring(0, 20)}</h5>

            {(current_playing?.id === playlist?.id) ? <PauseRoundedIcon className='show-icon-globle'
                onClick={() => {
                    spotify.getMyCurrentPlaybackState().then(state => {
                        if (state?.is_playing) {
                            spotify.pause();
                            dispatch({ type: "SET_CURRENT_PLAYING", payload: null });
                        }
                        else {
                            dispatch({ type: "SET_CURRENT_PLAYING", payload: playlist })
                            setTimeout(() => {
                                spotify.play()
                            }, 500)
                        }
                    })
                }} /> :
                <PlayArrowRoundedIcon className={isMouseIn ? "show-icon-globle " : "hide-icon-globle"}
                    onClick={() => {
                        dispatch({ type: "SET_URI", payload: playlist.uri });
                        dispatch({ type: "SET_CURRENT_PLAYING", payload: playlist })

                        setTimeout(() => {
                            spotify.play()
                        }, 500)

                    }} />}
        </div>
    )
}

export default GloblePlayList