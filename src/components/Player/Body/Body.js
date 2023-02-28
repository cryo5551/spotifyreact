import React from 'react';
import './Body.css';
import Header from './Header/Header';
import { useContextData } from '../../Context/StateProvider';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Song from './Songs/Song';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Body = () => {

    const [{discover_weekly}] = useContextData();

  return (
    <div className='body'>
        <Header/>

        <div className='body-info'>
            <img src={discover_weekly?.images[0]?.url} alt='album cover'/>
            
            <div className='body-info-text'>
                <strong>PLAYLIST</strong>
                <h2>{discover_weekly?.name}</h2>
                <p>{ discover_weekly?.description}</p>
            </div>
        </div>

        <div className='body-songs'>
            <div className='body-icons'>
                <PlayCircleFilledIcon className='body-play-shuffle'/>
                <FavoriteBorderIcon fontSize='large' sx={{ marginRight: 1 }}/>
                <MoreHorizIcon fontSize='large'/>
            </div>
            {/* list of songs */}

            {/* <div className='song-info'>
                <div className='song-info1'>
                    <strong>#</strong>
                    <span>TITLE</span>
                </div>
                <div className='song-info2'>
                    <span>ALBUM</span>
                    <span></span>
                <AccessTimeIcon/>
                </div>
                
            </div> */}

            {/* <div className='body-tracks'> */}
                {discover_weekly?.tracks.items.map((song,i) =>
                <Song track={song.track} key={i}/>
                )}
            {/* </div> */}
        </div>
    </div>
  )
}

export default Body;