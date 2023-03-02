import React from 'react'
import { useContextData } from '../../Context/StateProvider';
import Body from '../../Player/Body/Body';

const Nyan = () => {
  const [{playlists}] = useContextData();
  return (
    <div>
        <Body playlist={playlists?.items[3]}/>
    </div>
  )
}

export default Nyan