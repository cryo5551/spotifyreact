import React from 'react';
import './TopArtists.css'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import { useNavigate } from 'react-router-dom';
import { useContextData } from '../Context/StateProvider';



    


const TopArtistsTemplet = ({ artist, spotify}) => {

    const [{ current_playing }, dispatch] = useContextData();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch( { type: "SET_PLAYLIST_ALBUM", payload: artist });
        navigate(`/artist/${artist.id}`)
    }

  return (
    <div className='_top-artist-template' >
        <h2 onClick={handleClick} >Top Artist</h2>
            <img style={{borderRadius:"99px"}} src={artist?.images[0]?.url} alt="artistCover" onClick={handleClick} />
            <h1 onClick={handleClick} >{(artist?.name?.length > 16) ? artist?.name.substring(0, 16) + "..." : artist?.name}</h1>

            {(current_playing?.id === artist?.id) ? <PauseRoundedIcon className='liked-play-shuffle position'
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
                <PlayArrowRoundedIcon className='liked-play-shuffle position'
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

export default TopArtistsTemplet