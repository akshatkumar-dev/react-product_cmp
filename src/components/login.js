import React, {useRef,useEffect,useState,useContext} from 'react';
import axios from 'axios';
import Navbar from '../widgets/navbar';
import {UserContext} from '../user_context';
const Login = (props) =>{
    let [emailState,emailChange] = useState({email:""});
    let [passwordState,passwordChange] = useState({password:""});
    let x = useContext(UserContext);
    let changeToken = x.tokenChange
    useEffect(()=>{
        if(localStorage.getItem("auth")!==null){
            changeToken(localStorage.getItem("auth"))
        }
    },[changeToken])
    useEffect(()=>{
        const loginUser = async () =>{
            let data = {
                "email": emailState.email,
                "password": passwordState.password
            }
            emailState.email = "";
            let response  = await axios.post("http://localhost:4000/api/login",data);
            if(response.data !== "User does not exist" || response.data!=="Invalid credentials"){
                localStorage.setItem("auth",response.data);
                changeToken(response.data)
                console.log("logged in")
            }
            else{
                console.log("invalid");
            }
        }
        if(emailState.email.length !== 0){loginUser();}
    })
    let emailRef = useRef();
    let passwordRef = useRef();
    const loginHandler = () =>{
        emailChange({email:emailRef.current.value });
        passwordChange({password: passwordRef.current.value})
    }
    return(

        <div className="login-container">
            <Navbar />
            By signing in you can add items to cart to view them later and also for easy comparison
            <div className="login-form">
                <input ref={emailRef} type="text" placeholder="Email" required/> <br/>
                <input ref={passwordRef} type="password" placeholder="Password" required minLength="8"/> <br/>
                <button onClick={loginHandler}>Login</button>
                <button onClick={()=>{props.history.push("/viewcart")}}>View Cart</button>
            </div>
        </div>
    );
}

export default Login;