import React from 'react';
import './Header.css';
import Search from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { useContextData } from '../../../Context/StateProvider';

const Header = () => {
    const [{user}] = useContextData();
  return (
    <div className='header'>
        <div className='header-left'>
            <Search/>
            <input type='text' placeholder='Search for Artist, Songs or Playlists' />
        </div>

        <div className='header-right'>
            <Avatar src={user?.images[0]?.url} alt='pfp'/>
            <h4>{user?.display_name}</h4>

        </div>
    </div>
  )
}

export default Header