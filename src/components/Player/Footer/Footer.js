import React from 'react';
import './Footer.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPrevRoundedIcon from '@mui/icons-material/SkipNextRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import { Grid, Slider } from '@mui/material';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
// import SpotifyWebApi from 'spotify-web-api-js';
import { useContextData } from '../../Context/StateProvider';


const Footer = () => {

    const [{ current_song }] = useContextData()

    // const [isplaying, setIsPlaying] = useState(false);

    // const spotify = new SpotifyWebApi();
    // spotify.setAccessToken(token);

//    if (token) {
        // }

    // const playPause = () => {
    //     (!isplaying)?spotify.play():spotify.pause();
    //     (!isplaying)?setIsPlaying(true):setIsPlaying(false);

    // }

    // function skip(e) {
    //      (e)? spotify.skipToNext(): spotify.skipToPrevious();
    // }

    return (
        <div className='footer'>
            <div className='footer-left'>
                <img src={current_song?.item?.album?.images[0]?.url} alt='cover' />

                <div className='footer-song-info'>
                    <h4>{current_song?.item?.name}</h4>
                    <p>{current_song?.item?.artists[0]?.name}</p>
                </div>
            </div>

            <div className='footer-center'>
                <ShuffleRoundedIcon className='footer-green' />
                <SkipPrevRoundedIcon className='footer-icon'
                // onClick={skip(false)}
                />
                <PlayCircleIcon fontSize='large' className='footer-icon'
                // onClick={playPause}
                />
                <SkipNextRoundedIcon className='footer-icon'
                //  onClick={skip(true)} 
                />
                <RepeatRoundedIcon className='footer-green' />
            </div>

            <div className='footer-right'>
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider />
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}

export default Footer