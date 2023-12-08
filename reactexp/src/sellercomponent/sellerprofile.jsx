import {useEffect, useState} from 'react';
import style from './sellerprofilestyle.module.css'
import { getsellerinfo } from '../services/service';
function Sellerprofile(){
    const id=sessionStorage.getItem('usercode')
    const [formdata,setformdata]=useState({
        name:'',
        usercode:'',
        password:'',
        chpass:''
    })
    useEffect(()=>{
         getuserprofile();
    },[])
    let getuserprofile=async()=>{
        let res=await getsellerinfo(id)
         setformdata(res.data.data1[0])
         
    }
    const inputchange=(e)=>{
        const {name,value}=e.target;
        setformdata({...formdata,[name]:value})
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
        console.log(formdata)
        
    }
    return(
        <>
        <style>{`body {  background-color:#F27370; }`}</style>
         <div className= {style.profile}>
    <form>
        <div className= {style.form_group}>
            <label >Name</label>
            <input type="text" name='name' className= {style.form_control} value={formdata.name} onChange={inputchange} />
        </div>
        <div className= {style.form_group}>
            <label >usercode</label>
            <input type="text" name='usercode' className= {style.form_control}  value={formdata.usercode} onChange={inputchange} />
        </div>
        <div className= {style.form_group}>
            <label  >password</label>
            <input type="password" name='password' className={style.form_control} value={formdata.password} onChange={inputchange} />
        </div>
        <div className= {style.form_group}>
            <label >change password</label>
            <input type="text" name='chpass' className= {style.form_control}  value={formdata.chpass}  onChange={inputchange}/>
        </div>
        <div  className={style.btns}>
        <div className= {style.form_group}>
            <button type="submit" className={style.update} onClick={handlesubmit}>Update</button>
        </div>
        <div className={style.form_group}>
            <button className={style.cancel}>Cancel</button>
        </div>
    </div>
    </form>
</div>
        </>
)
}
export default Sellerprofile;