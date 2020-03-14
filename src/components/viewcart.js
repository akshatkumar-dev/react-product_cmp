import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../user_context';
import axios from 'axios'
import Navbar from '../widgets/navbar';
import Spinner from '../widgets/spinner'
const ViewCart = (props) =>{
    let [isLoading,isLoadingChange] = useState(true);

    let [lapcartdata,lapcartdataChange] = useState([]);
    let [phonecartdata,phonecartdataChange] = useState([]);
    let [lapcart,lapcartChange] = useState(true);
    let [phonecart,phonecartChange] = useState(true)
    let context = useContext(UserContext);
    let [checkedLocal,checkedLocalChange] = useState(false);
    let token = context.token;
    let [toDelete,toDeleteChange] = useState(null)
    let [toDeleteMob,toDeleteMobChange] = useState(null)
    let tokenChange = context.tokenChange;
    useEffect(()=>{
        let x = localStorage.getItem("auth")
        if(x !== null){
            tokenChange(x);
        }
        checkedLocalChange(true);
    },[tokenChange])
    useEffect(()=>{
        const fetchData = async ()=>{
            lapcartChange(false);
            let response = await axios.get("https://backend-node-productcmp.herokuapp.com/api/getlapcart",{headers:{Authorization: `Bearer ${token}`}})
            isLoadingChange(false)
            let x = []
            if(response.data !== "No"){

            
            Object.values(response.data).forEach(element=>{
                x.push({name:element["name"],vendor:element["vendor"],price: element["price"]})
            })
            lapcartdataChange([...x]);
        }else{
            alert("Not Authorized");
        }
        }
        if(lapcart && checkedLocal){fetchData()}
    })
    useEffect(()=>{
        const fetchData = async ()=>{
            phonecartChange(false);
            let response = await axios.get("https://backend-node-productcmp.herokuapp.com/api/getmobcart",{headers:{Authorization: `Bearer ${token}`}})
            isLoadingChange(false)
            let x = []
            if(response.data !== "No"){
                Object.values(response.data).forEach(element=>{
                    x.push({name:element["name"],vendor:element["vendor"],price: element["price"]})
                })
                phonecartdataChange([...x]);
            }
            else{alert("Not Authorized")}
        }
        if(phonecart && checkedLocal){fetchData()}
    })
    useEffect(()=>{
        const deleteData = async ()=>{
            
            let response = await axios.delete(`https://backend-node-productcmp.herokuapp.com/api/deletelapcart?name=${toDelete.name}&vendor=${toDelete.vendor}`,{headers:{Authorization: `Bearer ${token}`}})
            isLoadingChange(false)
            console.log(response.data)
            if(response.data === "Value removed"){
                lapcartdataChange(prev=>{
                    prev.splice(toDelete.index,1)
                    let x = [...prev]
                    return x;
                })
            }
        }
        if(toDelete !== null){deleteData()}
    },[toDelete,token])
    useEffect(()=>{
        const deleteData = async ()=>{
            
            let response = await axios.delete(`https://backend-node-productcmp.herokuapp.com/api/deletemobcart?name=${toDeleteMob.name}&vendor=${toDeleteMob.vendor}`,{headers:{Authorization: `Bearer ${token}`}})
            isLoadingChange(false);
            console.log(response.data)
            if(response.data === "Value removed"){
                
                phonecartdataChange(prev=>{
                    prev.splice(toDeleteMob.index,1);
                    let x = [...prev]
                    return x;
                });
            }
        }
        if(toDeleteMob !== null){deleteData()}
    },[toDeleteMob,token])
    const lapDeleteHandler = (name,vendor,index)=>{
        isLoadingChange(true)
        toDeleteChange({name:name,vendor:vendor,index:index})
    }
    const mobDeleteHandler = (name,vendor,index)=>{
        isLoadingChange(true)
        toDeleteMobChange({name:name,vendor:vendor,index:index})
    }
    const mobDetailsHandler = (name)=>{
        props.history.push(`/showdetails?type=phone&name=${name}`)
    }
    const lapDetailsHandler = (name,vendor)=>{
        props.history.push(`/showdetails?type=laptop&vendor=${vendor}&name=${name}`)
    }
    return (
        <React.Fragment>
            {isLoading?<Spinner/>:null}
            <Navbar/>
        <div className="viewcart-container">
            <div className="viewcart-laptop">
                <h1>Laptop cart</h1>
                <hr className="separator"/>

                {lapcartdata.length!==0?
                lapcartdata.map((element,index)=>{
                    return(
                    <div key={index} className="viewcart-item">
                        <p className="viewcart-name"><strong>{element.name}</strong></p>
                <p className="viewcart-price">{element.price}</p>
                <p className="viewcart-vendor">{element.vendor.charAt(0).toUpperCase()+element.vendor.slice(1)}</p>
                <p onClick={()=>{lapDeleteHandler(element.name,element.vendor,index)}} className="viewcart-delete">Remove</p>
                <p onClick={()=>{lapDetailsHandler(element.name,element.vendor)}} className="viewcart-detail">View Detail</p>
                <hr className="separator"/>
                    </div>
                    );
                })
                :<br></br>}
                
            </div>
            <div className="viewcart-phone">
                <h1>Phone cart</h1>
                <hr className="separator"/>
                {phonecartdata.length!==0?
                phonecartdata.map((element,index)=>{
                    return(
                        <div key={index} className="viewcart-item">
                        <p className="viewcart-name"><strong>{element.name}</strong></p>
                <p className="viewcart-price">{element.price}</p>
                <p className="viewcart-vendor">{element.vendor.charAt(0).toUpperCase()+element.vendor.slice(1)}</p>
                <p onClick={()=>{mobDeleteHandler(element.name,element.vendor,index)}} className="viewcart-delete">Remove</p>
                <p onClick={()=>{mobDetailsHandler(element.name)}} className="viewcart-detail">View Detail</p>

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

export default ViewCart;