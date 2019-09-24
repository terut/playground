import React from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import { Home } from './containers/Home'
import { Form } from './containers/Form'
import { Auth } from './containers/Auth'
import { Login } from './containers/Login'

const App: React.FC = () => {
  return (
    <div className="container">
      <header>
      </header>
      <div className="content">
        <Switch>
          <Route path="/login" component={Login} />
          <Auth>
            <Switch>
              <Route path="/posts/new" component={Form} />
              <Route path="/" component={Home} />
              <Redirect to="/" />
            </Switch>
          </Auth>
        </Switch>
      </div>
    </div>
  );
}

export default App;
