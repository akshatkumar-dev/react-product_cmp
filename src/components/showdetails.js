import React,{useState,useEffect,useContext} from 'react';
import qs from 'query-string';
import Navbar from '../widgets/navbar'
import axios from 'axios';
import {UserContext} from '../user_context';
import Spinner from '../widgets/spinner'
const ShowDetails = (props) =>{
    let [isLoading,isLoadingChange] = useState(true);

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
                response = await axios.get(`https://backend-node-productcmp.herokuapp.com/api/getpdetails?name=${string.name}`)
            }
            if(string.type === "laptop"){
                if(string.vendor === "flipkart"){
                    response = await axios.get(`https://backend-node-productcmp.herokuapp.com/api/getfldetails?name=${string.name}`)
                }
                if(string.vendor === "amazon"){
                    response = await axios.get(`https://backend-node-productcmp.herokuapp.com/api/getaldetails?name=${string.name}`)
                }
            }
            isLoadingChange(false)
            let x = [];
            Object.values(response.data).forEach(element=>{
                x.push({title:element["title"],info:element["info"]})
            })
            detailsChange([...x]);
        }
        if(details.length===0){getData();}
    })
    return(
        <React.Fragment>
            {isLoading?<Spinner/>:null}
            <Navbar/>
        <div className="showdetails-container">
            <h1>{qs.parse(props.location.search).name}</h1>
            {details.length!==0?
                details.map((element,index)=>{
                    return(
                    <div key={index}>
                    <p className = "showdetails-info"><strong>{element.title}:</strong> {element.info}</p>
                    <hr className="separator"/>
                    </div>
                    );
                })
                :<br></br>}
        </div>
        </React.Fragment>
    );
}

export default ShowDetails