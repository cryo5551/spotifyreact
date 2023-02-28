// import React, { useEffect, useState } from 'react';
import './Footer.css';
// import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
// import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
// import SpotifyWebApi from 'spotify-web-api-js';
import { useContextData } from '../../Context/StateProvider';
import SpotifyPlayer from 'react-spotify-web-playback';



const Footer = () => {

    const [{ token }] = useContextData()


    return (
        <div className='footer'>

            <SpotifyPlayer

                styles={{
                    activeColor: '#1fdf64',
                    bgColor: '#181818',
                    color: '#ffffff',
                    loaderColor: '#fff',
                    sliderColor: '#1cb954',
                    trackArtistColor: '#ccc',
                    trackNameColor: '#ffffff',
                    sliderHandleColor: "#ffffff",
                    textDecoration: 'none',
                }}
                token={token}
                uris={["spotify:playlist:37i9dQZEVXcQX9OpY7Rfve"]}
                hideAttribution = {true}
                showSaveIcon = {true}
            />

        </div>
    )
}

export default Footer