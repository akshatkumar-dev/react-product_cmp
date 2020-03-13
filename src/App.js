import React,{useState} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './components/login'
import Register from './components/register'
import Home from './components/home'
import ViewPhones from './components/viewphones';
import ViewLaptops from './components/viewlaptops';
import ShowDetails from './components/showdetails';
import ViewCart from './components/viewcart';
import {UserContext} from './user_context';
const App = () => {
  let [userToken,userTokenChange] = useState(null);
  const tokenchangeHandler = (token)=>{
    userTokenChange(token);
  }
  return (
    <div className="app-container">
      <UserContext.Provider value={{token: userToken,tokenChange: tokenchangeHandler}}>
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/viewphones" exact component={ViewPhones}/>
          <Route path="/viewlaptops" exact component={ViewLaptops}/>
          <Route path="/showdetails" exact component={ShowDetails}/>
          <Route path="/viewcart" exact component={ViewCart}/>
        </Switch>
      </div>
    </BrowserRouter>
        </UserContext.Provider>
    </div>

  );
}

export default App;
