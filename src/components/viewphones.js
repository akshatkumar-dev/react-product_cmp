import React,{useState,useRef,useEffect} from 'react';
import axios from 'axios'

const ViewPhones = (props) =>{
    let minPrice = useRef();
    let maxPrice = useRef();
    let [minPriceState,minPriceStateChange] = useState("");
    let [maxPriceState,maxPriceStateChange] = useState("");
    let [resultsState,resultsStateChange] = useState([]);
    let [resultsAState,resultsAStateChange] = useState([])
    let [flipkartdata,flipkartdataChange] = useState(false);
    let [amazondata,amazondataChange] = useState(false);
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
        props.history.push("/register")
    }
    const addToCartHandler = ()=>{
        props.history.push("/login")
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