import { BrowserRouter, Outlet, useNavigate ,Link} from 'react-router-dom';
import style from './dasboardstyle.module.css';

function Dashbaord(){
    let navigate=useNavigate();
    const admin=sessionStorage.getItem("uname");
    let change=()=>{
         if(confirm(`Logout ${admin} ?`))
        navigate("/navbar/home")
    }

     
    return(
        <>
        <div className={style.header}>
        <span><b>Milk Collection And Billing System</b></span>
        <span className={style.admin}><h3>Welcome {admin}</h3></span>
        <button  onClick={change} className={style.btn}> Logout</button>
        </div>
        <div className={style.dispaly}>
        <div className={style.sidebar}>
        <ul>
            <li><Link to="home2">Dashboard</Link></li>
            <li><Link to="addseller">Add seller</Link></li>
            <li><Link to="sellerlist">SellerList</Link></li>
            <li><Link to="milkcollection">Milkcollection</Link></li>
            <li><Link to="milkdata">MilkcollectionList</Link></li>
            <li><Link to="ratechart">Ratechart</Link></li>
            <li><Link to="billgeneration">BillGeneration</Link></li>
            <li><Link to="payment">Payment</Link></li>
            <li><Link to="profile">Profile</Link></li>
        </ul>
     </div>
        </div>
        <div className={style.content2}>
         <Outlet/>
        </div>
        
     
      
    
    
        </>
    )
}
export default Dashbaord