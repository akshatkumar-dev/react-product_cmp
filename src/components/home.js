import React,{useEffect,useContext} from 'react';
import Navbar from '../widgets/navbar'
import {UserContext} from '../user_context'
const Home = ()=>{
    let context = useContext(UserContext);
    let tokenChange = context.tokenChange;
    useEffect(()=>{
        let x = localStorage.getItem("auth")
        if(x !== null){
            tokenChange(x);
        }
    },[tokenChange])
    return(
        <div className="home-container">
            <Navbar/>
            <h1>Home page</h1>
        </div>
    );
}

export default Home;