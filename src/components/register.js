import React,{useEffect,useState,useRef} from 'react';
import Navbar from '../widgets/navbar';
import axios from 'axios';
const Register = () =>{
    let [emailState,emailStateChange] = useState({email:""})
    let [passwordState,passwordStateChange] = useState({password:""})
    let [otpState,otpStateChange] = useState({otp:0});
    let [otpStyleState,otpStyleChange] = useState({value: "none"})
    let [submitStyleState,submitStyleChange] = useState({value: "block"})
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
            let response  = await axios.post("http://localhost:4000/api/register",data);
            if(response.data === "otp sent"){
                otpStyleChange({value: "block"})
                submitStyleChange({value: "none"})
            }
        }
        if(emailState.email.length!==0){registerUser();}
    },[emailState.email,passwordState.password])
    useEffect(()=>{
        
        const confirmOtp = async () =>{
            let data = {
                "email": emailState.email,
                "password": passwordState.password,
                "otp": otpState.otp
            }
           let response = await axios.post("http://localhost:4000/api/confirmotp",data);
           console.log(response.data)
        }
        if(otpState.otp !== 0){confirmOtp()}
    },[otpState.otp,emailState.email,passwordState.password])
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