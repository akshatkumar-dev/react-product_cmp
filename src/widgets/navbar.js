import React,{useContext} from 'react';
import {NavLink} from 'react-router-dom'
import {UserContext} from '../user_context';
const Navbar = () =>{
    let context = useContext(UserContext);
    let token = context.token;
    return(
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-left">
                    <div className="navbar-title">
                        <NavLink to="/" className="navbar-link navbar-link-title">
                        COMPARATOR
                        </NavLink>
                    </div>
                    <div className="navbar-option">
                    <NavLink to="/viewlaptops" className="navbar-link">
                        Laptops
                        </NavLink>
                    </div>
                    <div className="navbar-option">
                    <NavLink to="/viewphones" className="navbar-link">
                        Phones
                        </NavLink>
                    </div>
                </div>
                {token===null?
                <div className="navbar-right">

                    <div className="navbar-option" >
                    <NavLink to="/login" className="navbar-link">
                        Login
                        </NavLink>
                    </div>
                    <div className="navbar-option">
                    <NavLink to="/register" className="navbar-link">
                        Register
                        </NavLink>
                    </div>
                    </div>
                :
                <div className="navbar-right">
                    <div className="navbar-option">
                    <NavLink to="/viewcart" className="navbar-link">
                        View Cart
                    </NavLink>
                    </div>
                    <div className="navbar-option">
                        Logout
                    </div>
                    </div>}
                </div>
        </div>
        
    );
}
export default Navbar;