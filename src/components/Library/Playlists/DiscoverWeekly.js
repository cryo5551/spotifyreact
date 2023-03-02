import React from 'react'
import { useContextData } from '../../Context/StateProvider';
import Body from '../../Player/Body/Body';

const DiscoverWeekly = () => {
  const [{playlists}] = useContextData();
  return (
    <div>
        <Body playlist={playlists?.items[1]}/>
    </div>
  )
}

export default DiscoverWeekly