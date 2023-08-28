import { useState } from "react";
import style from "./collectionstyle.module.css";
import { milkpostdata } from "../services/service";
function Milkcollection(){
    const [intialmilk,setintial]=useState({
        usercode:'  ',
        date:' ',
        timings:' ',
        milktype:' ',
        quantity:' ',
        fat:' ',
        snf:' '
    })
    const [milkdata,setmilk]=useState({
        usercode:'',
        date:'',
        timings:'',
        milktype:'',
        quantity:'',
        fat:'',
        snf:''
    })
    const inputchange=(e)=>{
        const {name,value}=e.target;
        setmilk({...milkdata,[name]:value})
    }
    let handle=async(e)=>{
      e.preventDefault();
      milkdata['username']=sessionStorage.getItem('username')
      console.log(milkdata);
      if(milkdata.usercode.length>0 && milkdata.date.length>0 && milkdata.fat.length>0 && milkdata.quantity>0 && milkdata.snf.length>0){
        let res=await milkpostdata(milkdata);
        if(res.data.submit==true){
          alert("data collected");
          setmilk(intialmilk);
        }
        else{
          alert("data not collected")
        }
      }
      else{
        alert("enter all required fields");
      }
     
    }
    return <>
     <style>{`body {background: linear-gradient(25deg , #0e1123, #617587); height:97vh}`}</style>
    <div className={style.contains}>
        <form >
            <div className={style.headers}>
                <p>Milk Collection</p>
            </div>
            <div className={style.form_group}>
                <label className={style.form_label}>Usercode</label><br/>
                <input type="text"   name="usercode" value={milkdata.usercode} onChange={inputchange}/>
            </div>
            <div className={style.form_group}>
                <label className={style.form_label} >Date</label><br/>
                <input type="date"  name="date" value={milkdata.date} onChange={inputchange} />
            </div>
            <div className={style.sdis}>
                <div className={style.form_group}>
                    <label  className={style.form_label}>Timings</label>
                    <select   className={style.control} name="timings" value={milkdata.timings} onChange={inputchange} >
                        <option selected>------</option>
                        <option value="Morning">Morning</option>
                        <option value="Evening">Evening</option>
                    </select>
                </div>
                <div className={style.form_group}>
                    <label  className={style.form_label}>MilkType</label>
                    <select   className={style.control}  name="milktype"  value={milkdata.milktype}  onChange={inputchange}>
                        <option selected>------</option>
                        <option value="Buffalo">Buffalo</option>
                        <option value="Cow">Cow</option>
                    </select>
                </div>
            </div>
            <div className={style.form_group}>
                <label  className={style.form_label}>Quantity</label><br/>
                <input type="text"    name="quantity" value={milkdata.quantity} onChange={inputchange} />
            </div>
            <div className={style.form_group}>
                <label className={style.form_label}>Fat</label><br/>
                <input type="text"   name="fat" value={milkdata.fat}  onChange={inputchange} />
            </div>
            <div className={style.form_group}>
                <label  className={style.form_label}>Snf</label><br/>
                <input type="text"   name="snf"  value={milkdata.snf}  onChange={inputchange}/>
            </div>
            <div className={style.btns}>
                <button type="submit" className={style.btn} onClick={handle} >Submit</button>
            </div>
        </form>
    </div>
    </>
}
export default Milkcollection;