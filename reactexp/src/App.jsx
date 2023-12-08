import './App.css';
import Aboutus from './navbarcomponents/aboutus';
import Contactus from './navbarcomponents/contactus';
import Login from './navbarcomponents/login';
import Home from './navbarcomponents/home';
import Navbar from './navbarcomponents/navbar';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Seller from './navbarcomponents/seller';
import Dashboard from './admincomponents/dashbaord';
import Home2 from './admincomponents/home2'
import Addseller from './admincomponents/addseller';
import Sellerlist from './admincomponents/sellerlist';
import Milkcollection from './admincomponents/milkcollection';
import Milkdata from './admincomponents/milkdata';
import Ratechart from './admincomponents/ratechart';
import Billgeneration from './admincomponents/Billgeneration';
import Payment from './admincomponents/payment';
import Profile from './admincomponents/profile';
import Sellerdash from './sellercomponent/sellerdash';
import Home3 from './sellercomponent/home3';
import Milkrecords from './sellercomponent/milkrecords';
import Paymentsinfo from './sellercomponent/paymentinfo';
import Sellerprofile from './sellercomponent/sellerprofile';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="" element={<Navigate to="/navbar"/>} />
          <Route path="navbar" element={<Navbar/>}>
            <Route path="" element={<Home/>} />
            <Route path="home" element={<Home/>}/>
            <Route path="login" element={<Login />} />
            <Route path="seller" element={<Seller />} />
            <Route path="contactus" element={<Contactus />} />
            <Route path="aboutus" element={<Aboutus />} />
          </Route>
          <Route path="dashboard" element={<Dashboard />}>
             <Route path="" element={<Home2/>} />
             <Route path="home2" element={<Home2/>}/>
             <Route path="addseller" element={<Addseller/>}/>
             <Route path="sellerlist" element={<Sellerlist/>}/>
             <Route path="milkcollection" element={<Milkcollection/>}/>
             <Route path="milkdata" element={<Milkdata/>}/>
             <Route path="ratechart" element={<Ratechart/>}/>
             <Route path="billgeneration" element={<Billgeneration/>}/>
             <Route path="payment" element={<Payment/>}/>
             <Route path="profile" element={<Profile/>}/>
           </Route>
           <Route path='sellerdash' element={<Sellerdash/>}>
            <Route path="" element={<Home3/>}/>
            <Route path="home3" element={<Home3/>}/>
            <Route path="milkrecords" element={<Milkrecords/>}/>
            <Route path="paymentinfo" element={<Paymentsinfo/>}/>    
            <Route path="sellerprofile" element={<Sellerprofile/>}/>                  
           </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
