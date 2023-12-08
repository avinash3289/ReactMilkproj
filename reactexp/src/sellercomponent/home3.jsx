import { useEffect, useState } from 'react';
import style from './home3style.module.css'
import { getall } from '../services/service';
 
function Home3(){
    const code=sessionStorage.getItem('usercode');

    const [sdata,setdata]=useState({
        days:'',
        liters:'',
        amount:'',
        remain:''
    })
  
   
     useEffect(
        ()=>{
            getinfo()
        },[]
     )
     let getinfo=async()=>{
        let res=await getall(code)
        console.log(res)
        setdata(res.data)
         
     }
     
    return(

        <>
       <div className={style.bmg}>
         <div className={style.bg}>
    <div className={style.abc}>
       <p>{sdata.days}</p>
       <span>No of days</span>
    </div>
    <div className={style.abc2}>
        <p>{sdata.liters}</p>
        <span>No of Liters</span>
    </div>
    <div className={style.abc3}>
        <p>₹{sdata.amount}</p>
        <span>Amount Received</span>
    </div>
    <div className={style.abc4}>
        
        <p>₹{sdata.remain}</p>
       
        <span>Pending Amount</span>
    </div>
</div>
</div>
     
 
        </>
    )
}
export default Home3;