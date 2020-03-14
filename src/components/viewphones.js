import React,{useState,useRef,useEffect,useContext} from 'react';
import axios from 'axios'
import Navbar from '../widgets/navbar'
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
                vendor: cartitem.vendor,
                price: cartitem.price
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
    const viewDetailsHandler = (name)=>{
        props.history.push(`/showdetails?type=phone&name=${name}`)
    }
    const addToCartHandler = (vendor,name,price)=>{
        cartitemChange({name: name,vendor: vendor,price: price})
    }
    const getDetailsHandlerB = () =>{
        flipkartdataChange(true)
        amazondataChange(true)
        minPriceStateChange(minPrice.current.value);
        maxPriceStateChange(maxPrice.current.value);
    }
    return(
        <React.Fragment>
            <Navbar/>
        <div className="viewlaptops-container">
            <div className="viewlaptops-filters">
                <h2 className="filter-heading">Filters</h2>
                <hr className="separator"/>
                <input ref={minPrice} type="text" placeholder="Minimum price"/> in ₹
                <input ref={maxPrice} type="text" placeholder="Maximum price"/> in ₹ <br/>
                <hr className="separator"/>
                <p className="apply-filter" onClick={getDetailsHandlerB}>Apply</p>
            </div>
            <div className="viewlaptops-flipkart">
                <h1 className="viewlaptops-vendor-title">
                    Flipkart
                </h1>
                <hr className="separator"/>
                {resultsState.length!==0?
                resultsState.map((element,index)=>{
                    return(
                    <div key={index}>
                        <div className="viewlaptops-result">
                <p className="result-name">{element.name}</p>
                <p className="result-price">{element.price}</p>
                <p className="result-cart" onClick={()=>addToCartHandler("flipkart",element.name,element.price)}>Add to cart</p>
                <p className="result-detail" onClick={()=>viewDetailsHandler(element.name)}>More details...</p>
                </div>
                <hr className="separator"/>
                    </div>
                    );
                })
                :<br></br>}
                
                </div>
                <div className="viewlaptops-amazon">

                <h1 className="viewlaptops-vendor-title">Amazon</h1>
                <hr className="separator"/>
                {resultsAState.length!==0?
                resultsAState.map((element,index)=>{
                    return(
                        <div key={index}>
                        <div className="viewlaptops-result">
                <p className="result-name">{element.name}</p>
                <p className="result-price">₹ {element.price}</p>
                <p className="result-cart" onClick={()=>addToCartHandler("amazon",element.name,element.price)}>Add to cart</p>
                <p className="result-detail" onClick={()=>viewDetailsHandler(element.name)}>More details...</p>
                </div>
                <hr className="separator"/>
                    </div>
                    );
                })
                :<br></br>}
                
                </div>
        </div>
        </React.Fragment>
    );
}

export default ViewPhones