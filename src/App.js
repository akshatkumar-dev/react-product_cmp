import React,{useState} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './components/login'
import Register from './components/register'
import Home from './components/home'
import ViewPhones from './components/viewphones';
import ViewLaptops from './components/viewlaptops';
import ShowDetails from './components/showdetails';
import {UserContext} from './user_context';
const App = () => {
  let [userToken,userTokenChange] = useState(null);
  return (
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={{token: userToken,tokenChange: userTokenChange}}>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/viewphones" exact component={ViewPhones}/>
          <Route path="/viewlaptops" exact component={ViewLaptops}/>
          <Route path="/showdetails" exact component={ShowDetails}/>
        </Switch>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
