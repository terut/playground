import React from 'react';
import './Item.css';

interface Props {
  url: string,
  description: string,
}

export const Item: React.FC<Props> = (props: Props) => {
  return (
    <li className="card">
      <img className="card-img" alt="" src="https://dummyimage.com/100x100/ccc/fff.jpg"></img>
      <div className="card-content">
        <a href={props.url}>terut/example</a>
        <p>{props.description}</p>
        <p>Wooooo<br/>HOOOOOO<br/>WOOOOO</p>
      </div>
    </li>
  )
}