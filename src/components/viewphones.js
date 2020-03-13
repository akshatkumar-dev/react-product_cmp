import React,{useState,useRef,useEffect,useContext} from 'react';
import axios from 'axios'
import {UserContext} from '../user_context';

const ViewPhones = (props) =>{
    let minPrice = useRef();
    let maxPrice = useRef();
    let context = useContext(UserContext);
    let token = context.token;
    let tokenChange = context.tokenChange;
    let [minPriceState,minPriceStateChange] = useState("");
    let [maxPriceState,maxPriceStateChange] = useState("");
    let [resultsState,resultsStateChange] = useState([]);
    let [resultsAState,resultsAStateChange] = useState([])
    let [flipkartdata,flipkartdataChange] = useState(false);
    let [amazondata,amazondataChange] = useState(false);
    let [cartitem,cartitemChange] = useState(null);
    useEffect(()=>{
        let x = localStorage.getItem("auth");
        if(x !== null){
            tokenChange(x);
        }
    },[tokenChange])
    useEffect(()=>{
        const addToCart = async ()=>{
            let data = {
                name: cartitem.name,
                vendor: cartitem.vendor
            }
            let response = await axios.put("http://localhost:4000/api/addmobcart",data,{headers:{Authorization: `Bearer ${token}`}});
            console.log(response.data);
        }
        if(cartitem !== null){addToCart()}
    },[cartitem,token])
    useEffect(()=>{
        const getDetails = async ()=>{
            amazondataChange(false);
            let response = await axios.get(`http://localhost:4000/api/getaphone?min=${minPriceState}&max=${maxPriceState}`);
            let x = []
            minPriceStateChange("")
            Object.values(response.data).forEach(element=>{
                x.push({name:element["name"],price:element["price"]})
            })
            resultsAStateChange([...x]);
        }
        if(minPriceState.length!==0 && amazondata){getDetails()}
    })
    useEffect(()=>{
        const getDetails = async ()=>{
            flipkartdataChange(false)
            let response = await axios.get(`http://localhost:4000/api/getfphone?min=${minPriceState}&max=${maxPriceState}`);
            let x = []
            minPriceStateChange("")
            Object.values(response.data).forEach(element=>{
                x.push({name:element["name"],price:element["price"]})
            })
            resultsStateChange([...x]);
        }
        if(minPriceState.length!==0 && flipkartdata){getDetails()}
    })
    const getDetailsHandler = ()=>{
        flipkartdataChange(true)
        minPriceStateChange(minPrice.current.value);
        maxPriceStateChange(maxPrice.current.value);
    }
    const viewDetailsHandler = (name)=>{
        props.history.push(`/showdetails?type=phone&name=${name}`)
    }
    const addToCartHandler = (vendor,name)=>{
        cartitemChange({name: name,vendor: vendor})
    }
    const getDetailsHandlerA = ()=>{
        amazondataChange(true)
        minPriceStateChange(minPrice.current.value);
        maxPriceStateChange(maxPrice.current.value);
    }
    const getDetailsHandlerB = () =>{
        flipkartdataChange(true)
        amazondataChange(true)
        minPriceStateChange(minPrice.current.value);
        maxPriceStateChange(maxPrice.current.value);
    }
    return(
        <div className="viewphones-container">
            <div className="viewphones-filters">
                <input ref={minPrice} type="text" placeholder="Minimum price"/><br/>
                <input ref={maxPrice} type="text" placeholder="Maximum price"/>
                <button onClick={getDetailsHandler}>ShowFlipkart</button>
                <button onClick={getDetailsHandlerA}>ShowAmazon</button>
                <button onClick={getDetailsHandlerB}>ShowBoth</button>
            </div>
            <div className="viewphones-results">
                <h1>FlipKart Data</h1>
                {resultsState.length!==0?
                resultsState.map((element,index)=>{
                    return(
                    <div key={index}>
                    <p>{element.name} {element.price}</p>
                    <button onClick={()=>viewDetailsHandler(element.name)}>View Details</button>
                    <button onClick={()=>addToCartHandler("flipkart",element.name)}>Cart</button>
                    </div>
                    );
                })
                :<br></br>}
                <h1>Amazon Data</h1>
                {resultsAState.length!==0?
                resultsAState.map((element,index)=>{
                    return(
                    <div key={index}>
                    <p>{element.name} {element.price}</p>
                    <button onClick={()=>viewDetailsHandler(element.name)}>View Details</button>
                    <button onClick={()=>addToCartHandler("amazon",element.name)}>Cart</button>
                    </div>
                    );
                })
                :<br></br>}
            </div>
        </div>
    );
}

export default ViewPhones