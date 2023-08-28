import { useEffect, useState } from "react";
import { getmilk } from "../services/service";
import style from "./milkliststyle.module.css"
function Milkdata(){
    let id=sessionStorage.getItem('username');
    const [milk,setmilk]=useState([])
    useEffect(()=>{
        milkdata();
    },[setmilk])

    let milkdata=async()=>{
       let res= await getmilk(id);
       setmilk(res.data.results)
    }
    return <>
     
    <div>
        <table className={style.table}>
            <thead>
              <tr>
                <th>usercode</th>
                <th>date</th>
                <th>Milktype</th>
                <th>Timings</th>
                <th>Quantity</th>
                <th>Fat</th>
                <th>Snf</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
                   {
                     milk.map(
                        (m)=>{
                            return(
                                <tr>
                                    <td>{m.usercode}</td>
                                    <td>{new Date(m.date).toLocaleDateString()}</td>
                                    <td>{m.milktype}</td>
                                    <td>{m.timings}</td>
                                    <td>{m.quantity}</td>
                                    <td>{m.fat}</td>
                                    <td>{m.snf}</td>
                                    <td>{m.price}</td>
                                    <td>{m.Amount}</td>
                                </tr>
                            )
                        }
                     )
                   }
            </tbody>
        </table>
    </div>

    </>
}
export default Milkdata;