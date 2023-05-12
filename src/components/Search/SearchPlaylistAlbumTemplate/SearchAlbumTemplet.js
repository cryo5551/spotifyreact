import React, { useState } from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import { useNavigate } from 'react-router-dom';
import { useContextData } from '../../Context/StateProvider';


    

const SearchAlbumTemplet = ({ album, spotify}) => {

    const [{ current_playing }, dispatch] = useContextData();
    const [isMouseIn, setIsMouseIn] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch( { type: "SET_PLAYLIST_ALBUM", payload: album });
        navigate(`/album/${album.id}`)
    }

  return (
    <div className='globle-playlist' onMouseEnter={() => setIsMouseIn(true)} onMouseLeave={() => setIsMouseIn(false)} >
            <img src={album?.images[0]?.url} alt="albumCover" onClick={handleClick} />
            <h4>{(album?.name?.length > 16) ? album?.name.substring(0, 16) + "..." : album?.name}</h4>
            <h5>{album?.artists[0]?.name?.substring(0, 20)}</h5>

            {(current_playing?.id === album?.id) ? <PauseRoundedIcon className='show-icon-globle'
                onClick={() => {
                    spotify.getMyCurrentPlaybackState().then(state => {
                        if (state?.is_playing) {
                            spotify.pause();
                            dispatch({ type: "SET_CURRENT_PLAYING", payload: null });
                        }
                        else {
                            dispatch({ type: "SET_CURRENT_PLAYING", payload: album })
                            setTimeout(() => {
                                spotify.play()
                            }, 300)
                        }
                    })
                }} /> :
                <PlayArrowRoundedIcon className={isMouseIn ? "show-icon-globle " : "hide-icon-globle"}
                    onClick={() => {
                        dispatch({ type: "SET_URI", payload: album?.uri });
                        dispatch({ type: "SET_CURRENT_PLAYING", payload: album })

                        setTimeout(() => {
                            spotify.play()
                        }, 300)

                    }} />}
        </div>
  )
}

export default SearchAlbumTemplet