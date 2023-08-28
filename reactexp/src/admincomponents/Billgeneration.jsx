import { useState } from "react";
import style from "./billstyle.module.css";
import { billgenerate } from "../services/service";
function Billgeneration(){
    const [showdata,closedata]=useState(false)
    const id=sessionStorage.getItem('username')
    const [billdata,setbill]=useState({
        "usercode":'',
        "date1":"",
        "date2":''
    })

    const [bill,upbill]=useState({
        usercode:'',
        name:'',
        Liters:'',
         
    })
    const [amount,setamount]=useState()
    let handle=async(e)=>{
        e.preventDefault();
        console.log(billdata);
        if(billdata.date1.length>0 && billdata.date2.length>0 && billdata.usercode.length>0){
            let res=await billgenerate(id,billdata);
            console.log(res.data)
            upbill(res.data.bill)
            setamount(res.data.bal)
            if(res.data.submit==true){
                closedata(true);
            }
        }
        else{
              alert("Enter Required data")
        }
    }
    let inputchange=(e)=>{
        const {name,value}=e.target;
        setbill({...billdata,[name]:value})
    }
    return <>
     <style>{`body { background-color:#FFD89C;}`}</style>
    <div className={style.content}>
        <form  >
            <div className={style.head4}>
                <h3>Bill Generation</h3>
            </div>
            <div className={style.bill}>
                <div className={style.form_group}>
                    <label >Usercode</label>
                    <input type="text"  name="usercode" value={billdata.usercode} onChange={inputchange}/>
                </div>
                <div className={style.form_group}>
                    <label  >From</label>
                    <input type="date" name="date1" value={billdata.date1}  onChange={inputchange}/>
                </div>
                <div className={style.form_group}>
                    <label >To</label>
                    <input type="date" name="date2"  value={billdata.date2} onChange={inputchange}/>
                </div>
               
            </div>
            <div className="button">
                <input type="submit"  className={style.btn} onClick={handle} value="Generate"/>
            </div>
        </form>
    </div>
    {
        showdata &&<div className={style.tab}>
            <table>
                <thead>
                     <tr>
                        <th>Name</th>
                        <th>usercode</th>
                        <th>Liters</th>
                        <th>Bill</th>
                     </tr>
                </thead>
                <tbody>
                     <tr>
                        <td>{bill[0].Name}</td>
                        <td>{bill[0].usercode}</td>
                        <td>{bill[0].Liters}</td>
                        <td>{amount}</td>
                     </tr>
                </tbody>
            </table>
        </div>

    }
    </>
}
export default Billgeneration;