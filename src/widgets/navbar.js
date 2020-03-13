import React,{useContext} from 'react';
import {NavLink} from 'react-router-dom'
import './navbar.css'
import {UserContext} from '../user_context';
const Navbar = () =>{
    let context = useContext(UserContext);
    let token = context.token;
    return(
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-title">
                    Product Cmp
                </div>
                <div className="navbar-options">
                    <div className="navbar-option">
                        <NavLink to="/viewphones">
                        Phones
                        </NavLink>
                    </div>
                    <div className="navbar-option">
                        <NavLink to="/viewlaptops">
                        Laptops
                        </NavLink>
                    </div>
                    {token===null?
                    <div className="navbar-notlogged">
                        <div className="navbar-option">
                        <NavLink to="/login">
                        Login
                        </NavLink>
                    </div>
                    <div className="navbar-option">
                    <NavLink to="/register">
                        Register
                        </NavLink>                    
                    </div>
                    </div>:<div className="navbar-logged">
                    <div className="navbar-option">
                        <NavLink to="/viewcart">
                        View Cart
                        </NavLink>
                    </div>
                        <div className="navbar-option">
                        <NavLink to="/">
                        Logout
                        </NavLink>
                    </div>
                    </div>
                    }
                    
                </div>
            </div>
        </div>
    );
}
export default Navbar;