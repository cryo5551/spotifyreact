import React, { useEffect, useState } from 'react';
import './Search.css';
import SearchIco from '@mui/icons-material/Search';
import { useContextData } from '../Context/StateProvider';
import SpotifyWebApi from 'spotify-web-api-js';
import CategoryTemplate from './CatagoryTemplate/CategoryTemplate';


const Search = () => {

    const [ searchResults, setSearchResults] = useState();
    const [categorys, setCategorys] = useState();
    const [{token}] = useContextData();
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(token);


    useEffect(()=>{
        spotify.getCategories({limit:50}).then(playlists => setCategorys(playlists));
    },[])

    // console.log("catagorys",categorys)

    const showResults = (query) => {

        if(query) {
        spotify.search(query,['album','artist','playlist','track']).then(results => setSearchResults(results));
        setInterval(console.log(searchResults),1000);
        }
    }


  return (
    <div className='search-container'>
        <div className='search-bar'>
            <SearchIco/>
            <input type='text' placeholder='Search for Artist, Songs or Playlists' onInput={(e) => showResults(e.target.value)} />
        </div>
        <h2>Browse all</h2>
        <div className='categorys-container'>
             {categorys?.categories?.items?.map(catagory => <CategoryTemplate item={catagory} key={catagory?.id}/> )}
        </div>
    </div>
  )
}

export default Search