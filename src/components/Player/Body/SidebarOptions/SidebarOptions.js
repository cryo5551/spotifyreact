import React from 'react';
import './SidebarOptions.css';
import { Link } from 'react-router-dom';


const SidebarOptions = ({title, Icons}) => {
  return (
    <div className='sidebarOptions'>
       {(Icons)? <Icons className="icons_css"/>:""}
        {(Icons)?<Link to={`/${title}`} className="nev-items"><h4>{title}</h4></Link>: <p><Link to={`/${title}`} className="nev-items">{title}</Link></p> }
    </div>
  )
}

export default SidebarOptions