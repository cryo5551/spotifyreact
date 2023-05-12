import React, { useEffect, useState } from 'react'
import "./Home.css";
import { useContextData } from '../Context/StateProvider';
import PlaylistTemplate from '../PlaylistTemplate/PlaylistTemplate';
import RecentlyPlayed from './RecentlyPlayedTemplate/RecentlyPlayed';


const Home = ({ spotify }) => {

    const [state,dispatch] = useContextData();
    const [recentlyPlayed, setRecentlyPlayed] = useState();

    console.log(state);
    // console.log(recentlyPlayed);


    const { playlists,token,liked_songs } = state;

    spotify.setAccessToken(token);

    const images = [{
        url: "https://i.ibb.co/cyFRk03/Untitled-Design.png"
    }]

    const likedUris = liked_songs?.items?.map(item => item?.track?.uri);

    useEffect(()=>{
        spotify.getMySavedTracks({limit:50}).then(playlists => dispatch({type:"SET_LIKED_SONGS", payload:playlists}));
        spotify.getMyRecentlyPlayedTracks({limit:4}).then(playlists => setRecentlyPlayed(playlists));
        
        // spotify.getFeaturedPlaylists().then(playlists => console.log("Featured",playlists));
        // spotify.getNewReleases().then(playlists => console.log("new Releases",playlists))
        
        // spotify.getMyTopArtists().then(playlists => console.log("top Artist",playlists))
        // spotify.getCategoryPlaylists("toplists").then(playlists => console.log("toplist",playlists));
        getHomeInfo();
    },[]);

    const getHomeInfo = () => {
    }

    return (
        <div className='home-container'>
            <h1>Good morning</h1>

            <div className="home-playlists">
                <PlaylistTemplate item={{...liked_songs, "images": images, name:"Liked Songs","uri":likedUris}} />
                {playlists?.items?.map(playlist => <PlaylistTemplate item={playlist} key={playlist.id} />)}
            </div>

            <h2>Recently played</h2>
            <div className='recently-played'>
                {recentlyPlayed?.items?.map((e)=> <RecentlyPlayed item={e?.track}/>)}
            </div>
        </div>
    )
}

export default Home