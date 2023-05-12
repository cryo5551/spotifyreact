// import React, { Children } from 'react'
import './Mylayout.css'
import { getTokenFromUrl } from '../../spotify'
import Login from '../LogIn/Login'
// import Header from '../Header/Header'
import Sidebar from '../Player/Body/Sidebar'
import Footer from '../Player/Footer/Footer'
import Main from '../Main/Main'



const Mylayout = ({ children }) => {

    const hash = getTokenFromUrl();
    const _token = hash.access_token;



    


    if (!_token) return (
        <Login />
    )

    else return (
        <div className='mylayout'>

            <div className='__sidebar'>
                <Sidebar />
            </div>


            <Main>
                <div style={{ padding: "0px 25px 30px 25px" }}>
                {children}
                </div>
            </Main>
            

            <Footer />

        </div>
    )
}

export default Mylayout