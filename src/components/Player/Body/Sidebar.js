import React from 'react';
import './Sidebar.css';
import SidebarOptions from './SidebarOptions/SidebarOptions';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useContextData } from '../../Context/StateProvider';


const Sidebar = () => {

    const [{playlists}] = useContextData();

  return (
    <div className='sidebar'>
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt='logo' />

        <SidebarOptions title="Home" Icons={HomeIcon} />
        <SidebarOptions title="Search" Icons={SearchIcon} />
        <SidebarOptions title="Your Library" Icons={LibraryMusicIcon} />
        <br/>
        <strong className='sidebarTitle'>PlayLists</strong>
        <hr/>
        {playlists?.items?.map(e => <SidebarOptions title={e.name} key={e.name}/>)}
    </div>
  )
}

export default Sidebar;
