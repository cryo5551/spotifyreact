import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Library from './components/Library/Library'
import BedTYM from './components/Library/Playlists/BedTYM'
import DiscoverWeekly from './components/Library/Playlists/DiscoverWeekly'
import Lol from './components/Library/Playlists/Lol'
import Nyan from './components/Library/Playlists/Nyan'
import SadLyf from './components/Library/Playlists/SadLyf'
import Mylayout from './components/Mylayout/Mylayout'
import Search from './components/Search/Search'
import LikedSongs from './components/Library/Playlists/LikedSongs'
import Mogu from './components/Library/Playlists/Mogu'
import Playlist from './components/Playlist/Playlist';
import Album from './components/Album/Album'


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
            <Route path='/Discover weekly' element={<DiscoverWeekly/>} /> 
            <Route path='/bedTYM' element={<BedTYM/>} /> 
            <Route path='/lol' element={<Lol/>} /> 
            <Route path='/Nyan' element={<Nyan/>} /> 
            <Route path='/Sad lyf' element={<SadLyf/>} /> 
            <Route path="/liked songs" element={<LikedSongs/>} /> 
            <Route path="/mogu mogu YUUMY! /もぐもぐYUMMY！" element={<Mogu/>} /> 
            <Route path="/playlist/:id" element={<Playlist/>} /> 
            <Route path="/album/:id" element={<Album/>} /> 
            <Route path="/artist/:id" element={<Album/>} /> 
        </Routes>
        </Mylayout>
        </BrowserRouter>
    </div>
  )
}

export default Router