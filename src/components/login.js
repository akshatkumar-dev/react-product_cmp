import React, {useRef,useEffect,useState} from 'react';
import axios from 'axios';
import Navbar from '../widgets/navbar';
const Login = () =>{
    let [emailState,emailChange] = useState({email:""});
    let [passwordState,passwordChange] = useState({password:""});
    
    useEffect(()=>{
        const loginUser = async () =>{
            let data = {
                "email": emailState.email,
                "password": passwordState.password
            }
            let response  = await axios.post("http://localhost:4000/api/login",data);
            console.log(response.data);
        }
        if(emailState.email.length !== 0){loginUser();}
    },[emailState.email,passwordState.password])
    let emailRef = useRef();
    let passwordRef = useRef();
    const loginHandler = () =>{
        emailChange({email:emailRef.current.value });
        passwordChange({password: passwordRef.current.value})
    }
    return(

        <div className="login-container">
            <Navbar/>
            By signing in you can add items to cart to view them later and also for easy comparison
            <div className="login-form">
                <input ref={emailRef} type="email" placeholder="Email" required/> <br/>
                <input ref={passwordRef} type="password" placeholder="Password" required minLength="8"/> <br/>
                <button onClick={loginHandler}>Login</button>
            </div>
        </div>
    );
}

export default Login;