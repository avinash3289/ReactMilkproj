import React from 'react';
import { Link ,Outlet} from 'react-router-dom';
import style from './style.module.css'
function Navbar() {
  return (
    <>
    <div className={style.nav}>
        <div className={style.header1}>
            <h3>Milk collection & Billing System</h3>
        </div>
      <ul>
        <li><Link to="home">Home</Link></li>
        <li><Link to="login">Login</Link></li>
        <li><Link to="seller">Seller</Link></li>
        <li><Link to="aboutus">About Us</Link></li>
        <li><Link to="contactus">Contact Us</Link></li>
      </ul>
    </div>
    <div className={style.content}>
        <Outlet/>
    </div>
    </>
  );
}

export default Navbar;
