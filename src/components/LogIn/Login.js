/* import React from 'react';
import { loginUrl } from '../../spotify';
import './Login.css';



const Login = () => {
    return (
        <div className='login'>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt='spotify' />
            <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
        </div>
    )
}

export default Login
*/

import React from 'react';
import { loginUrl } from '../../spotify';
import './Login.css';

const Login = () => {
  return (
    <div className='login'>
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="spotify" />
      {/* We swapped href for onClick, and added a pointer cursor so it still looks like a link */}
      <a onClick={loginUrl} style={{ cursor: 'pointer' }}>LOGIN WITH SPOTIFY</a>
    </div>
  )
}

export default Login;
