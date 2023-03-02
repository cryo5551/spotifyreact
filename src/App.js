import { useEffect} from 'react';
import './App.css';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Login from './components/LogIn/Login';
// import Player from './components/Player/Player';
import { useContextData } from './components/Context/StateProvider';
import Home from './components/Home/Home';

function App() {

  const spotify = new SpotifyWebApi();

  // const[token,setToken] = useState(null);

  const [state, dispatch] = useContextData();

  useEffect(() => {
    const hash = getTokenFromUrl();
    const _token = hash.access_token;
    if (_token) {
      dispatch({ type: "SET_TOKEN", payload: _token });
      spotify.setAccessToken(_token);
      spotify.getMe()
        .then(e => dispatch({ type: "SET_USER", payload: e }));

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          payload: playlists
        })
      });
    }
    window.location.hash = "";
  }, []);

  // console.log(token);

  return (
    <div className="app">

      {state?.token ? <Home spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
