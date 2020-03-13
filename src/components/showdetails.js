import React,{useState,useEffect,useContext} from 'react';
import qs from 'query-string';
import axios from 'axios';
import {UserContext} from '../user_context';
const ShowDetails = (props) =>{
    let [details,detailsChange] = useState([]);
    let context = useContext(UserContext);
    let tokenChange = context.tokenChange;
    useEffect(()=>{
        let x = localStorage.getItem("auth")
        if(x !== null){
            tokenChange(x);
        }
    },[tokenChange])
    useEffect(()=>{
        const getData = async ()=>{
            let string = qs.parse(props.location.search);
            let response;
            if(string.type === "phone"){
                response = await axios.get(`http://localhost:4000/api/getpdetails?name=${string.name}`)
            }
            if(string.type === "laptop"){
                if(string.vendor === "flipkart"){
                    response = await axios.get(`http://localhost:4000/api/getfldetails?name=${string.name}`)
                }
                if(string.vendor === "amazon"){
                    response = await axios.get(`http://localhost:4000/api/getaldetails?name=${string.name}`)
                }
            }
            let x = [];
            Object.values(response.data).forEach(element=>{
                x.push({title:element["title"],info:element["info"]})
            })
            detailsChange([...x]);
        }
        if(details.length===0){getData();}
    })
    return(
        <div className="showdetails-container">
            <h1>Product Details</h1>
            {details.length!==0?
                details.map((element,index)=>{
                    return(
                    <div key={index}>
                    <p>{element.title}: {element.info}</p>
                    </div>
                    );
                })
                :<br></br>}
        </div>
    );
}

export default ShowDetails