import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../user_context';
import axios from 'axios'

const ViewCart = () =>{
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
            let response = await axios.get("http://localhost:4000/api/getlapcart",{headers:{Authorization: `Bearer ${token}`}})
            let x = []
            if(response.data !== "No"){

            
            Object.values(response.data).forEach(element=>{
                x.push({name:element["name"],vendor:element["vendor"]})
            })
            lapcartdataChange([...x]);
        }else{
            console.log("not authorized")
        }
        }
        if(lapcart && checkedLocal){fetchData()}
    })
    useEffect(()=>{
        const fetchData = async ()=>{
            phonecartChange(false);
            let response = await axios.get("http://localhost:4000/api/getmobcart",{headers:{Authorization: `Bearer ${token}`}})
            let x = []
            if(response.data !== "No"){
                Object.values(response.data).forEach(element=>{
                    x.push({name:element["name"],vendor:element["vendor"]})
                })
                phonecartdataChange([...x]);
            }
            else{console.log("not authorized")}
        }
        if(phonecart && checkedLocal){fetchData()}
    })
    useEffect(()=>{
        const deleteData = async ()=>{
            
            let response = await axios.delete(`http://localhost:4000/api/deletelapcart?name=${toDelete.name}&vendor=${toDelete.vendor}`,{headers:{Authorization: `Bearer ${token}`}})
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
            
            let response = await axios.delete(`http://localhost:4000/api/deletemobcart?name=${toDeleteMob.name}&vendor=${toDeleteMob.vendor}`,{headers:{Authorization: `Bearer ${token}`}})
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
        toDeleteChange({name:name,vendor:vendor,index:index})
    }
    const mobDeleteHandler = (name,vendor,index)=>{
        toDeleteMobChange({name:name,vendor:vendor,index:index})
    }
    return (
        <div className="viewcart-container">
            <h1>Laptop cart</h1>
            {lapcartdata.length!==0?
                lapcartdata.map((element,index)=>{
                    return(
                    <div key={index}>
                    <p>{element.name} {element.vendor} <button onClick={()=>{lapDeleteHandler(element.name,element.vendor,index)}}>Delete</button></p>
                    </div>
                    );
                })
                :<br></br>}
                <h1>Phone cart</h1>
                {phonecartdata.length!==0?
                phonecartdata.map((element,index)=>{
                    return(
                    <div key={index}>
                    <p>{element.name} {element.vendor} <button onClick={()=>{mobDeleteHandler(element.name,element.vendor,index)}}>Delete</button></p>
                    </div>
                    );
                })
                :<br></br>}
        </div>
    );
}

export default ViewCart;