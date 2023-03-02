import React from 'react';
import "./CategoryTemplate.css";

const CategoryTemplate = ({item}) => {

  const colors = ["#e13300","#1e3264","#e8115b","#e91429","#b02897","#a56752","#8d67ab","#e91429","#7358ff","#148a08","#b02897","#537aa1","#c39687","#ba5d07","#bc5900","#056952","#777777","#dc148c","#503750","#f59b23","#7d4b32"]
  const localStyle = {
    backgroundColor: colors[Math.floor(Math.random()*20)]
  }
  return (
    <div style={localStyle} className='catagory-template'>
        <h2>{item?.name}</h2>
        <img src={item?.icons[0]?.url} alt="catagoryICO" />
    </div>
  )
}

export default CategoryTemplate