import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import { Home } from './components/Home';
import { Form } from './containers/Form';

const App: React.FC = () => {
  return (
    <div className="container">
      <header>
      </header>
      <div className="content">
        <Switch>
          <Route path="/posts/new" component={Form} />
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
