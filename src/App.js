import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Main from './pages/Main';
import Sport from './pages/Sport';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/sports' component={Sport} />
        <Redirect to='/' component={Main} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
