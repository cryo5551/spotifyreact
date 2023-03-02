import React from 'react'
import { useContextData } from '../../Context/StateProvider'
import Body from '../../Player/Body/Body';

const BedTYM = () => {
  const [{playlists}] = useContextData();

  return (
    <div>
        <Body playlist={playlists?.items[0]}/>
    </div>
  )
}

export default BedTYM