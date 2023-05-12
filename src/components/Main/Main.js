import React, { useState } from 'react'
import { useContextData } from '../Context/StateProvider'
import Header from '../Header/Header';
import './Main.css'

const Main = ({children}) => {

    const [data, setData] = useState(20);
    const handleScroll = e => {
        setData(e.nativeEvent.target.childNodes[0].offsetTop);
     }

  return (
    <div className='__children'  onScroll={(e) => handleScroll(e)} >
        
        <Header scroll_position={data} />
        {children}
    </div>
  )
}

export default Main