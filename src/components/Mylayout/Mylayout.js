// import React, { Children } from 'react'
import './Mylayout.css'
import { getTokenFromUrl } from '../../spotify'
// import { useContextData } from '../Context/StateProvider'
import Login from '../LogIn/Login'
// import Header from '../Player/Body/Header/Header'
import Sidebar from '../Player/Body/Sidebar'
import Footer from '../Player/Footer/Footer'



const Mylayout = ({children}) => {

    const hash = getTokenFromUrl();
    const _token = hash.access_token;

    if (!_token) return (
        <Login/>
    )

  else return (
    <div className='mylayout'>

        <div className='__sidebar'>
            <Sidebar/>
        </div>
        {/* <header>
            <Header/>
        </header> */}

        <content className='__children'>
            {children}
        </content>

        {/* <footer className='__footer'> */}
            <Footer/>
        {/* </footer> */}
    </div>
  )
}

export default Mylayout