import React,{useEffect,useState,useRef,useContext} from 'react';
import Navbar from '../widgets/navbar';
import axios from 'axios';
import {UserContext} from '../user_context';
const Register = () =>{
    let [emailState,emailStateChange] = useState({email:""})
    let [passwordState,passwordStateChange] = useState({password:""})
    let [otpState,otpStateChange] = useState({otp:0});
    let [otpStyleState,otpStyleChange] = useState({value: "none"})
    let [submitStyleState,submitStyleChange] = useState({value: "block"})
    let x = useContext(UserContext);
    let changeToken = x.tokenChange
    let emailref = useRef();
    let passref = useRef();
    let otpref = useRef();
    let otpStyle = {
        display: otpStyleState.value
    }
    let submitStyle ={
        display: submitStyleState.value
    }
    useEffect(()=>{
        
        const registerUser = async () =>{
            let data = {
                "email": emailState.email,
                "password": passwordState.password
            }
            emailState.email = "";
            let response  = await axios.post("http://localhost:4000/api/register",data);
            if(response.data === "otp sent"){
                otpStyleChange({value: "block"})
                submitStyleChange({value: "none"})
            }
        }
        if(emailState.email.length!==0){registerUser();}
    })
    useEffect(()=>{
        
        const confirmOtp = async () =>{
            let data = {
                "email": emailState.email,
                "password": passwordState.password,
                "otp": otpState.otp
            }
            otpState.otp = 0;
           let response = await axios.post("http://localhost:4000/api/confirmotp",data);
           if(response.data !== "wrong otp"){
               changeToken(response.data)
           }
        }
        if(otpState.otp !== 0){confirmOtp()}
    })
    const registerHandler = ()=>{
        emailStateChange({email:emailref.current.value})
        passwordStateChange({password:passref.current.value})
    }
    const checkOtpHandler = () =>{
        otpStateChange({otp: parseInt(otpref.current.value)})
    }
    return(
        <div className="register-container">
            <Navbar/>
            <div className="register-form">
                <input ref={emailref} type="email" placeholder="Email" required/> <br/>
                <input ref={passref} type="password" placeholder="Password" required minLength="8"/> <br/>
                <button style={submitStyle} onClick={registerHandler}>Register</button>
    <p style={otpStyle}>An otp has been sent to {emailState.email}</p>
                <input ref={otpref} style={otpStyle} type="text" placeholder="OTP"/> <br/>
                <button style={otpStyle} onClick={checkOtpHandler}>Confirm</button>

            </div>
        </div>
    );
}

export default Register;