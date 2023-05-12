import React, { useEffect, useState } from 'react';
import './Search.css';
import SearchIco from '@mui/icons-material/Search';
import { useContextData } from '../Context/StateProvider';
import SpotifyWebApi from 'spotify-web-api-js';
import CategoryTemplate from './CatagoryTemplate/CategoryTemplate';
import SearchPlaylistTemplet from "./SearchPlaylistAlbumTemplate/SearchPlaylistTemplet"
import SearchAlbumTemplet from './SearchPlaylistAlbumTemplate/SearchAlbumTemplet';
import SearchSongTemplet from './SearchPlaylistAlbumTemplate/SearchSongTemplet';
import ArtistTemplet from '../Artists/ArtistTemplet';
import TopArtistsTemplet from '../Artists/TopArtistsTemplet';


const Search = () => {

    const [searchResults, setSearchResults] = useState();
    const [categorys, setCategorys] = useState();
    const [query, setQuery] = useState();
    const [{ token }] = useContextData();
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(token);


    useEffect(() => {
        spotify.getCategories({ limit: 50 }).then(playlists => setCategorys(playlists));
    }, [])

    // console.log("catagorys",categorys)

    const showResults = (query) => {
        setQuery(query);
        if (query) {
            spotify.search(query, ['album', 'artist', 'playlist', 'track'],{limit:4}).then(results => setSearchResults(results));

            setInterval(console.log(searchResults), 1000);
        }
    }


    return (
        <div className='search-container'>
            <div className='search-bar'>
                <SearchIco />
                <input type='text' placeholder='Search for Artist, Songs or Playlists' onInput={(e) => showResults(e.target.value)} />
            </div>
            <h2 className={(query)? 'hide-categorys-container':""}>Browse all</h2>
            <div className={(query) ? 'hide-categorys-container' : 'categorys-container'}>
                {categorys?.categories?.items?.map(catagory => <CategoryTemplate item={catagory} key={catagory?.id} />)}
            </div>


            
            <div className={(query)? "":'hide-categorys-container'}>


                <div style={{display:"flex", justifyContent:"space-between"}}>

                <div>
                    {(searchResults)?<TopArtistsTemplet artist={searchResults?.artists?.items[0]} spotify={spotify} key="topartist"/>:""}
                </div>

                
            <div className='searched-songs'>
            <h2>Songs</h2>
                {searchResults?.tracks?.items?.map(track => <SearchSongTemplet track={track} spotify={spotify} key={track?.id} />)}
            </div>

            </div>
            <h2>Albums</h2>
            <div className='searched-albums'>
                {searchResults?.albums?.items?.map(album => <SearchAlbumTemplet album={album} spotify={spotify} key={album?.id} />)}
            </div>

            <h2>Artists</h2>
            <div className='searched-albums'>
                {searchResults?.artists?.items?.map(artist => <ArtistTemplet artist={artist} spotify={spotify} key={artist?.id} />)}
            </div>

            <h2>Playlists</h2>
            <div className='searched-playlists'>
                {searchResults?.playlists?.items?.map(playlist => <SearchPlaylistTemplet playlist={playlist} spotify={spotify} key={playlist?.id} />)}
            </div>
            </div>

        </div>
    )
}

export default Search