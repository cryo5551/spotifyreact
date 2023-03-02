import React from 'react'
import { useContextData } from '../../Context/StateProvider';
import Body from '../../Player/Body/Body';

const Lol = () => {
  const [{playlists}] = useContextData();
  return (
    <div>
        <Body playlist={playlists?.items[2]}/>
    </div>
  )
}

export default Lol