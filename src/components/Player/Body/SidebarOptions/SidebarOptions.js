import React from 'react';
import './SidebarOptions.css';
const SidebarOptions = ({title, Icons}) => {
  return (
    <div className='sidebarOptions'>
       {(Icons)? <Icons className="icons_css"/>:""}
        {(Icons)?<h4>{title}</h4>:<p>{title}</p>}
    </div>
  )
}

export default SidebarOptions