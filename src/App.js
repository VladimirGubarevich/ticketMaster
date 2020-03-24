import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Main from './pages/Main';
import Sport from './pages/Sport';
import Family from './pages/Family';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/sports' component={Sport} />
        <Route path='/family' component={Family} />
        <Redirect to='/' component={Main} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
