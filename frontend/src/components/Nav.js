import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="nav-ul">
            
                {
                    auth ?
                    <ul className="nav-ul">
                    <>
                        <li><Link to="/">Sweets List</Link></li>
                        <li><Link to="/add-sweet">Add Sweets</Link></li>
                        <li><Link to="/sweets/restock">Restock Sweet</Link></li>
                        <li><Link to="/sweets/purchase">Purchase Sweet</Link></li>
                        <li><Link onClick={logout} to="/login">Logout</Link></li>
                    </>
                    </ul>
                    :
                    <ul className="nav-ul nav-right">
                    <>
                        <li><Link to="/register">Signup</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                    </ul>
                }
            
        </div>
    );
};

export default Nav;
