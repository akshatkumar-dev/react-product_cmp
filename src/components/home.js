import React,{useEffect,useContext} from 'react';
import Navbar from '../widgets/navbar'
import {UserContext} from '../user_context'
import Cart from '../assets/cart.png'
import Details from '../assets/details.png'
import Laptop from '../assets/laptop.png'
import Phone from '../assets/phone.png'
import Mern from '../assets/mern.webp'
const Home = ()=>{
    let context = useContext(UserContext);
    let tokenChange = context.tokenChange;
    useEffect(()=>{
        let x = localStorage.getItem("auth")
        if(x !== null){
            tokenChange(x);
        }
    },[tokenChange])
    return(
        <React.Fragment>
            <Navbar/>
        <div className="home-container">
            
            <div className="home-title">
                <div className="home-title-item1">
                    <div>

                <h1 className="text">Compare Phones</h1>
                <p className="text">Compare phones from sites like flipkart and amazon</p>
                    </div>
                    <div>

                <img src={Phone} alt="Sample"/>
                    </div>
                </div>
                <div className="home-title-item2">
                <div>

                <h1 className="text">Compare Laptops</h1>
                <p className="text">Easy one click filters to find the right product faster</p>
                </div>
                <div>

                <img src={Laptop} alt="Sample"/>
                </div>
                </div>
                <div className="home-title-item1">
                <div>

                <h1 className="text">View Full Details</h1>
                <p className="text">Get full details of the product and make right choice</p>
                </div>
                <di><img src={Details} alt="Sample"/></di>
                </div>
                <div className="home-title-item2">
                <div>

                <h1 className="text">Minimalistic cart design</h1>
                <p className="text">Add item to cart to compare them later</p>
                </div>
                <div>
                <img src={Cart} alt="Sample"/>
                </div>
                </div>
            </div>
            <div className="home-final">

            <div className="home-about">
                <h1>What?</h1>
                <p>This page gets the real time data from flipkart and amazon at the same time<br/> based on
                    your filters to provide a <br/>simultaneous comparison between products from different 
                    e-commerce websites.
                </p>
            </div>
            <hr className="separator"/>
            <div className="home-reason">
                <h1>Why?</h1>
                <p>
                    Keeping in mind the increasing number of phone and laptop manufacturers it is easy to
                    pay more for less. A good analysis of products is important to get the best deal.<br/>
                    However nobody has time to go through a gazillion websites just to find the right product.
                    This is a platform where those gazillion websites converge into one simple minimalistic
                    app to save your time and money.
                </p>
            </div>
            <hr className="separator"/>
            <div className="home-technology">
                <h1>Web Stack Used</h1>
                <img src={Mern} alt="Mern"></img>
            </div>
            </div>
            
        </div>
        </React.Fragment>
    );
}

export default Home;