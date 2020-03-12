import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './components/login'
import Register from './components/register'
import Home from './components/home'
import ViewPhones from './components/viewphones';
import ViewLaptops from './components/viewlaptops';
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/viewphones" exact component={ViewPhones}/>
          <Route path="/viewlaptops" exact component={ViewLaptops}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
