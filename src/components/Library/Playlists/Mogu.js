import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js';
import { useContextData } from '../../Context/StateProvider';
import Body from '../../Player/Body/Body';

const Mogu = () => {

    const spotify = new SpotifyWebApi();
    const [moguMogu, setMoguMogu] = useState();
    const [{ token }] = useContextData();


    useEffect(() => {
        spotify.setAccessToken(token)
        spotify.getPlaylist("4mcxGvEVnqLubOFC7OyMXR").then(playlist => setMoguMogu(playlist));
    }, []);

    console.log(moguMogu);

    return (
        <div>
            <Body playlist={{...moguMogu,id:"4mcxGvEVnqLubOFC7OyMXR"}} />
        </div>

    )
}

export default Mogu