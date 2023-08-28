import { useState } from "react";
import style from "./paymentstyle.module.css";
import { getpayment, payments } from "../services/service";
function Payment(){
    let id=sessionStorage.getItem('username');
    let inputchange=(e)=>{
        const {name,value}=e.target;
        setpay({...pay,[name]:value})
    }
    const [intialform,setintialform]=useState({
        usercode:' ',
        date:' ',
        amount:' '
    })
    const [form,setform]=useState(false)
    const [paydetail,setdetails]=useState([])
    const [pay,setpay]=useState({
        usercode:'',
        date:'',
        amount:''
    })
    const [searchval,setval]=useState({
        search:''
    })
    let handle=async(e)=>{
       e.preventDefault();
       if(pay.amount.length>0 && pay.date.length>0 && pay.usercode.length>0){
        let res=await payments(id,pay);
        if(res.data.submit==true){
         alert("Payment successfull!!!");
         console.log(pay);
         setpay(intialform)
        }
        else{
         alert("payment failed");
        }
       }
       else{
        alert("Enter Required Data")
       }
    }
    let search=async(e)=>{
            e.preventDefault();
            console.log(searchval)
            if(searchval.search.length>0){
                setform(true)
                let res= await getpayment(searchval.search)
                setdetails(res.data.paydetails)
            }
            else{
                alert("Enter Search Id")
            }
    }
    let searchin=(e)=>{
        const {name,value}=e.target;
        setval({...searchval,[name]:value})
    }
    return <>
    <style>{`body {  background: linear-gradient(45deg ,#FE6244, #b9ddfd);
    height:97vh; }`}</style>
    <div className={style.srch}>
        <form>
            <div className={style.sh}>
            <input type="search" name="search" value={searchval.search} onChange={searchin}/>
            <button className={style.bs} onClick={search} >Search</button>
            </div>
        </form>
    </div>
    <div className={style.container}>
        <form className={style.forms}>
        <span>Payment form</span>
            <div className={style.form_group}>
                <label className={style.form_label} >Usercode</label>
                <input type="text"  name="usercode" value={pay.usercode} onChange={inputchange} />
            </div>
            <div className={style.form_group}>
                <label className={style.form_label}>Date ----</label>
                <input type="date"  name="date"     value={pay.date} onChange={inputchange} />
            </div>
            <div className={style.form_group}>
                <label className={style.form_label} >Amount</label>
                <input type="text"   name="amount"  value={pay.amount} onChange={inputchange} />
            </div>
            <div className={style.bt}>
                <button className={style.btn} onClick={handle}>Payment</button>
            </div>
        </form>
    </div>
    {
        form&&<div className={style.pay}>
            <button className={style.close} onClick={()=>{
                setform(false)
            }}>X</button>
            <table>
                <thead>
                    <th>Usercode</th>
                    <th>Date</th>
                    <th>payment</th>
                </thead>
                <tbody>
                      {
                        paydetail.map(
                            (p)=>{
                                return <tr>
                                    <td>{p.usercode}</td>
                                    <td>{new Date(p.date).toLocaleDateString()}</td>
                                    <td>{p.amount}</td>
                                </tr>
                            }
                        )
                      }
                </tbody>
            </table>
        </div>
    }
    </>
}
export default Payment;