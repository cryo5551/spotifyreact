import React, { useState } from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import { useNavigate } from 'react-router-dom';
import { useContextData } from '../Context/StateProvider';


const ArtistTemplet = ({ artist, spotify}) => {

    const [{ current_playing }, dispatch] = useContextData();
    const [isMouseIn, setIsMouseIn] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch( { type: "SET_PLAYLIST_ALBUM", payload: artist });
        navigate(`/artist/${artist.id}`)
    }

    
  return (
    <div className='globle-playlist' onMouseEnter={() => setIsMouseIn(true)} onMouseLeave={() => setIsMouseIn(false)} >
            <img style={{borderRadius:"99px"}} src={artist?.images[0]?.url} alt="artistCover" onClick={handleClick} />
            <h4>{(artist?.name?.length > 16) ? artist?.name.substring(0, 16) + "..." : artist?.name}</h4>
            <h5>{artist?.genres[0]?.substring(0, 20)}</h5>

            {(current_playing?.id === artist?.id) ? <PauseRoundedIcon className='show-icon-globle'
                onClick={() => {
                    spotify.getMyCurrentPlaybackState().then(state => {
                        if (state?.is_playing) {
                            spotify.pause();
                            dispatch({ type: "SET_CURRENT_PLAYING", payload: null });
                        }
                        else {
                            dispatch({ type: "SET_CURRENT_PLAYING", payload: artist })
                            setTimeout(() => {
                                spotify.play()
                            }, 300)
                        }
                    })
                }} /> :
                <PlayArrowRoundedIcon className={isMouseIn ? "show-icon-globle " : "hide-icon-globle"}
                    onClick={() => {
                        dispatch({ type: "SET_URI", payload: artist?.uri });
                        dispatch({ type: "SET_CURRENT_PLAYING", payload: artist })

                        setTimeout(() => {
                            spotify.play()
                        }, 300)

                    }} />}
        </div>
  )
}

export default ArtistTemplet