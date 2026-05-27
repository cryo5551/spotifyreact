import React, { useEffect } from 'react';
import './App.css';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Login from './components/LogIn/Login'; 
import { useContextData } from './components/Context/StateProvider';
import Home from './components/Home/Home';

const spotify = new SpotifyWebApi();

function App() {
  const [state, dispatch] = useContextData();

  useEffect(() => {
    console.log("🟢 APP MOUNTED! Checking URL...");
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      console.log("🟢 FOUND CODE IN URL:", code);
      window.history.pushState({}, null, "/");

      getTokenFromUrl(code).then(token => {
        console.log("🟢 TOKEN RECEIVED IN APP:", token);
        if (token) {
          dispatch({ type: "SET_TOKEN", payload: token });
          spotify.setAccessToken(token);
          spotify.getMe().then(user => {
            dispatch({ type: "SET_USER", payload: user });
          });
          spotify.getUserPlaylists().then((playlists) => {
            dispatch({ type: "SET_PLAYLISTS", payload: playlists });
          });
        }
      }).catch(err => console.error("🚨 TOKEN FETCH ERROR:", err));
    } else {
      console.log("🔴 No code found in URL.");
    }
  }, [dispatch]); 

  return (
    <div className="app">
      {state?.token ? <Home spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
