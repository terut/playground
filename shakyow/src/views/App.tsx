import React from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import { Home } from './containers/Home'
import { Form } from './containers/Form'
import { Auth } from './containers/Auth'
import { Login } from './containers/Login'
import { Prototype } from './components/Prototype'
import { Presense } from './components/Presense'

const App: React.FC = () => {
  return (
    <>
      <header>
      </header>
      <div className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <Auth>
            <Switch>
              <Route path="/posts/new" component={Form} />
              <Route path="/prototypes/iprestriction" component={Prototype} />
              <Route path="/prototypes/presense" component={Presense} />
              <Route path="/" component={Home} />
              <Redirect to="/" />
            </Switch>
          </Auth>
        </Switch>
      </div>
    </>
  );
}

export default App;
