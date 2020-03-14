import React,{useEffect,useState,useRef,useContext} from 'react';
import Navbar from '../widgets/navbar';
import axios from 'axios';
import {UserContext} from '../user_context';
import Spinner from '../widgets/spinner'
const Register = (props) =>{
    let [isLoading,isLoadingChange] = useState(false);

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
        if(localStorage.getItem("auth")!==null){
            changeToken(localStorage.getItem("auth"))
        }
    },[changeToken])
    useEffect(()=>{
        
        const registerUser = async () =>{
            let data = {
                "email": emailState.email,
                "password": passwordState.password
            }
            emailState.email = "";
            let response  = await axios.post("http://localhost:4000/api/register",data);
            isLoadingChange(false)
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
           isLoadingChange(false)
           if(response.data !== "wrong otp"){
               localStorage("auth",response.data)
               changeToken(response.data)
           }
        }
        if(otpState.otp !== 0){confirmOtp()}
    })
    const registerHandler = ()=>{
        isLoadingChange(true)
        emailStateChange({email:emailref.current.value})
        passwordStateChange({password:passref.current.value})
    }
    const checkOtpHandler = () =>{
        isLoadingChange(true)
        otpStateChange({otp: parseInt(otpref.current.value)})
    }
    return(
        <React.Fragment>
            {isLoading?<Spinner/>:null}
            <Navbar/>
        <div className="register-container">
            <p className="register-info">By registering items can be added to cart to view later and other benefits can be availed</p>
            <div className="register-form">
                <input ref={emailref} type="email" placeholder="Email" required/> <br/>
                <input ref={passref} type="password" placeholder="Password" required minLength="8"/> <br/>
                <p className="register" style={submitStyle} onClick={registerHandler}>Register</p>
                <p className="registered">Already registered? <span onClick={()=>{props.history.push("/register")}}>Click here</span></p>

    <p style={otpStyle}>An otp has been sent to {emailState.email}</p>
                <input ref={otpref} style={otpStyle} type="text" placeholder="OTP"/> <br/>
                <p className="register" style={otpStyle} onClick={checkOtpHandler}>Confirm</p>

            </div>
        </div>
        </React.Fragment>
    );
}

export default Register;