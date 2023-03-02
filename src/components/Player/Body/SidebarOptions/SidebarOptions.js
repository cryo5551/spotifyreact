import React from 'react';
import './SidebarOptions.css';
import { Link } from 'react-router-dom';
import { useContextData } from '../../../Context/StateProvider';


const SidebarOptions = ({ title, Icons }) => {
  
  const [{path}, dispatch] = useContextData();
  
  const getPath = () => {
    setTimeout(() => {
      const _path = window.location.pathname;
      dispatch({type: "SET_PATH", payload: _path.split("%20").join(" ") }); 
      console.log(_path.split("%20").join(" "));
    },100)
    
  }

  return (
    <Link to={`/${title}`} className="nev-items" onClick={getPath}>
      <div className={(path === `/${title}`)? "sidebarOptions light":"sidebarOptions dark"}>
        {(Icons) ? <Icons className="icons_css" /> : ""}
        {(Icons) ? <h4>{title}</h4> : <p>{title}</p>}
      </div>
    </Link>
  )
}

export default SidebarOptions