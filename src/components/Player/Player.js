import React, { useEffect } from 'react';
import './Player.css';
import { useContextData } from '../Context/StateProvider'
import Body from './Body/Body';
// import Sidebar from './Body/Sidebar';
// import Footer from './Footer/Footer';

const  Player= ({spotify}) => {

    const [state] = useContextData();
    console.log(state);

    useEffect(() => {
    
},[]);


  return (
    <div className='player'>
        <div className='player-body'>

            {/* sidebar */}
            {/* <Sidebar/> */}
        
            {/* header and body content */}
            <Body/>

        </div>

        {/* footer (control Bar) */}
        {/* <Footer/> */}

    </div>
  )
}

export default Player