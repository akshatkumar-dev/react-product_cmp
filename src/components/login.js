import React, {useRef,useEffect,useState,useContext} from 'react';
import axios from 'axios';
import {UserContext} from '../user_context';
import Navbar from '../widgets/navbar'
//import './login.css';
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
        <React.Fragment>
            <Navbar/>
        <div className="login-container">
            <div className="login-form">
                <div className="inputBackground">

                <input ref={emailRef} type="text" placeholder="Email" required/> <br/>
                </div>
                <input ref={passwordRef} type="password" placeholder="Password" required minLength="8"/> <br/>
                <p className="login"onClick={loginHandler}>Login</p>
                <p className="not-registered">Not registered? <span onClick={()=>{props.history.push("/register")}}>Click here</span></p>
            </div>
        </div>
        </React.Fragment>
    );
}

export default Login;