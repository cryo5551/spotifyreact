import React from 'react';
import './Sidebar.css';
import SidebarOptions from './SidebarOptions/SidebarOptions';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
// import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useContextData } from '../../Context/StateProvider';
import { Link} from 'react-router-dom';


const Sidebar = () => {

    const [{playlists,path}, dispatch] = useContextData();
  
  const getPath = () => {
    setTimeout(() => {
      const _path = window.location.pathname;
      dispatch({type: "SET_PATH", payload: _path.split("%20").join(" ") }); 
    },100)
    
  }


  return (
    <div className='sidebar'>
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt='logo' />

        <SidebarOptions title="Home" Icons={HomeIcon} />
        <SidebarOptions title="Search" Icons={SearchIcon} />
        <SidebarOptions title="Your Library" Icons={LibraryMusicIcon} />
        <br/>
        {/* <SidebarOptions title="Liked Songs" Icons={FavoriteRoundedIcon} /> */}
        <Link to="/Liked Songs" style={{textDecoration:"none"}} onClick={getPath}>
          
          <strong className={(path === "/Liked Songs")? "sidebarTitle light":"sidebarTitle dark"}>
          <img src='https://i.ibb.co/cyFRk03/Untitled-Design.png' alt='liked'/> Liked Songs</strong>
        </Link>
        <hr/>
        {playlists?.items?.map(e => <SidebarOptions title={e.name} key={e.name}/>)}
    </div>
  )
}

export default Sidebar;
