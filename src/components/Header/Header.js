import React from 'react';
import './Header.css';
import Search from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { useContextData } from '../Context/StateProvider';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [{user}] = useContextData();
    const nevigate = useNavigate(); 
  return (
    <div className='header'>
        <div className='header-left' onClick={() => nevigate("/Search")}>
            <Search/>
            {/* <input type='text' placeholder='Search for Artist, Songs or Playlists' /> */}
        </div>

        <div className='header-right'>
            <Avatar src={user?.images[0]?.url} alt='pfp' sx={{ width: 30, height: 30 }}/>
            <h4>{user?.display_name}</h4>

        </div>
    </div>
  )
}

export default Header