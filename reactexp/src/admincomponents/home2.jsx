import { useEffect, useState } from "react";
import { getdata } from "../services/service";
import style from "./home2style.module.css";
function Home2(){
    let user=sessionStorage.getItem('username');
    const [amount,setamount]=useState(null);
    const [price, setPrice] = useState(null);
    const [users, setUsers] = useState(null);
    const [liters, setLiters] = useState(null);
    useEffect(()=>{
    getinfo();
    },[amount,price,users,liters])

    const getinfo=async()=>{
       let res=await getdata(user);
       const amount=res.data.amount[0]['sum(Amount)'];
       const price=res.data.milkprice[0]['max(price)'];
       const users=res.data.nousers[0]['count(*)'];
       const liters=res.data.totalmilk[0]['sum(quantity)']
       console.log(amount,price,users,liters);
       setamount(amount);
       setLiters(liters);
       setPrice(price);
       setUsers(users);
    }
    return <>
    <style>{`body {background-color: #FFDCB6;}`}</style>
    <div className={style.content}>
        <div className={style.cards}>
            <div className={style.card}>
                <div className={style.box}>
                    <h2>{users}</h2>
                    <h4 className={style.mi}>No of sellers</h4>
                </div>
                <div className={style.icon}>
                    <img src='../../src/assets/mem.png' width="85px"/>
                </div>
            </div>
            <div className={style.card}>
                <div className={style.box}>
                    <h2 className={style.pr}>₹{price}</h2>
                    <h4 className={style.red}>Milk price</h4>
                </div>
                <div className={style.icon}>
                    <img src="../../src/assets/milkl.jpeg" width="85px"/>
                </div>
            </div>
            <div className={style.card}>
                <div className={style.box}>
                    <h3>{liters}Liters</h3>
                    <p>Total milk</p>
                </div>
                <div className={style.icon}>
                    <img src="../../src/assets/ml.jpeg" width="85px"/>
                </div>
                 
            </div>
           
            <div className={style.card}>
                <div className={style.box}>
                    <h2 className={style.am}>₹{amount}</h2>
                    <h4 className={style.pm}>Amount</h4> 
                </div>
                <div className={style.icon}>
                    <img src="../../src/assets/r.jpeg" width="85px"/>
                </div>
            </div>
            
            
        </div>
    </div>
    <div className={style.logo}>
        <img src="../../src/assets/logo.png" width="350px" height="300px"/>
    </div>
    </>
}
export default Home2;