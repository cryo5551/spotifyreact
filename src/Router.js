import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Library from './components/Library/Library'
// import Login from './components/LogIn/Login'
import Mylayout from './components/Mylayout/Mylayout'
import Search from './components/Search/Search'


const Router = () => {
  return (
    <div>
        <BrowserRouter>
        <Mylayout>
        <Routes>
            {/* <Route path='' element={<Login/>} /> */}
            <Route path='/Home' element={<App/>} />  
            <Route path='/search' element={<Search/>} />  
            <Route path='/your library' element={<Library/>} />   
        </Routes>
        </Mylayout>
        </BrowserRouter>
    </div>
  )
}

export default Router