import React from 'react';
import './App.css';
import { Item } from './components/Item';

const App: React.FC = () => {
  return (
    <div className="App">
      <ul>
        <Item msg="WooHoo111"></Item>
        <Item msg="WooHoo222"></Item>
      </ul>
    </div>
  );
}

export default App;
