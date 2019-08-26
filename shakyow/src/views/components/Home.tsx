import React from 'react';
import './Home.css';
import { Item } from './Item';

export const Home: React.FC = (props) => {
  return (
    <>
      <a className="button-nav" href="/posts/new">Post</a>
      <ul>
        <Item msg="WooHoo111"></Item>
        <Item msg="WooHoo222"></Item>
      </ul>
    </>
  );
}