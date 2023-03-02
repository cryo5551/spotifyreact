import React from 'react'
import { useContextData } from '../../Context/StateProvider';
import Body from '../../Player/Body/Body';

const SadLyf = () => {
  const [{playlists}] = useContextData();
  return (
    <div>
        <Body playlist={playlists?.items[4]}/>
    </div>
  )
}

export default SadLyf