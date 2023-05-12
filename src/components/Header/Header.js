import React, { useState } from 'react';
import './Header.css';
import { Avatar } from '@mui/material';
import { useContextData } from '../Context/StateProvider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const Header = ({ scroll_position }) => {
  const [{ user, playlists, path }] = useContextData();
  const [isArrowUp, setArrowUp] = useState(true);
  let pathNames = [];
  pathNames = (playlists?.items)? playlists?.items?.map(e => '/' + e?.name):[];
  pathNames.push("/Liked Songs");
  pathNames.push("/mogu mogu YUUMY! /もぐもぐYUMMY!");
  pathNames.push("/playlist");

  console.log(pathNames);

  return (

    <div className={(scroll_position > 100) ? 'header dark-header' : 'header'}>

      

      <div className='real-header'>

      <div>
        <ArrowBackIosNewIcon className='arrowBtns backward'/>
        <ArrowForwardIosIcon className='arrowBtns forward'/>
      </div>

        <div className='header-right' onClick={() => (isArrowUp) ? setArrowUp(false) : setArrowUp(true)}>

          <Avatar src={user?.images[0]?.url} alt='pfp' sx={{ width: 30, height: 30 }} />
          <h3>{user?.display_name}</h3>
          {(isArrowUp) ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </div>
      </div>


      {(pathNames.includes(path) && scroll_position > 370) ? <div 
      className='song-info-header'
      >
        <div 
        className='song-info1-header'
        >
          <strong>#</strong>
          <span>TITLE</span>
        </div>
        <div 
        className='song-info2-header'
        >
          <span>ALBUM</span>
          <span></span>
          <AccessTimeIcon />
        </div>

      </div> : ""}
    </div>



  )
}

export default Header