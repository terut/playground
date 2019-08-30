import React from 'react';
import './Item.css';

interface Props {
  msg: string,
}

export const Item: React.FC<Props> = (props: Props) => {
  return (
    <li className="card">
      <img className="card-img" alt="" src="https://dummyimage.com/100x100/ccc/fff.jpg"></img>
      <div className="card-content">
        <a href="http://www.example.com">terut/example</a>
        <p>{props.msg}</p>
        <p>Wooooo<br/>HOOOOOO<br/>WOOOOO</p>
      </div>
    </li>
  )
}