import { useEffect, useState } from "react";
import style from "./profilestyle.module.css";
import { getprofile, updateprofile } from "../services/service";
function Profile(){
    let id=sessionStorage.getItem('username');
    const [profile,setprofile]=useState({
        name:'',
        username:'',
        password:'',
        chpass:''
    })
    useEffect(()=>{
        getdata()
    },[setprofile]
    )
    const inputchange=(e)=>{
      const {name,value}=e.target;
      setprofile({...profile,[name]:value})
    }

    let getdata=async()=>{
       let res= await getprofile(id)
       console.log(res)
       setprofile(res.data.data[0])
    }
    let updatepro=async(e)=>{
        e.preventDefault();
        console.log(profile)
       let res= await updateprofile(id,profile);
       if(res.data.submit==true){
        alert("Profile updated");
        getdata()
       }
       else{

        alert("profile not updated")
       }
    }
    return <>
     
    
    <div className={style.profile}>
    <style>{`body {  background-color:#F27370; }`}</style>
        <form>
            <span> <i className="fa fa-user-circle abc"  aria-hidden="true"></i></span>
           
            <div className={style.form_group}>
                <label className={style.form_label}>Name </label>
                <input type="text"  className={style.form_control} name="name" value={profile.name} onChange={inputchange} />
            </div>
            <div className={style.form_group}>
                <label className={style.form_label} >username</label>
                <input type="text"  className={style.form_control} name="username" value={profile.username}  onChange={inputchange}/>
            </div>
            <div className={style.form_group}>
                <label className={style.form_label}>password</label>
                <input type="password"  className={style.form_control} name="password"  value={profile.password}  onChange={inputchange}/>
            </div>
            <div className={style.form_group}>
                <label  className={style.form_label}>change pass</label>
                <input type="text"  className={style.form_control} name="chpass" value={profile.chpass}  onChange={inputchange}/>
            </div>
            <div className={style.btnsss}>
            <div className= {style.form_group}>
                <button className={style.update } onClick={updatepro} >Update</button>
            </div>
            <div className= {style.form_group}>
                <button  className={style.cancel}>Cancel</button>
            </div>
        </div>
        </form>
    </div>
    <div>
         
    </div>
     
    </>
}
export default Profile;