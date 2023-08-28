import { useState } from "react";
import style from "./adminstyle.module.css";
import { postdata } from "../services/service";
function Addseller(){
    const [intialdata,setintial]=useState({
        name:' ',
        email:' ',
        password:' ',
        usercode:' ',
        phoneno:' ',
        street:' ',
        village:' ',
        mandal:' ',
        District:' ',
        state:' ',
        zipcode:' ',
        RegisterDate:' ',
        gender:' '

    })
    const [sellerdata,setseller]=useState({
        name:'',
        email:'',
        password:'',
        usercode:'',
        phoneno:'',
        street:'',
        village:'',
        mandal:'',
        District:'',
        state:'',
        zipcode:'',
        RegisterDate:'',
        gender:''
        
    });
    let inputchange=(e)=>{
        const {name,value}=e.target;
        setseller({...sellerdata,[name]:value})
    }
    let handle=async(e)=>{
         e.preventDefault();
         console.log(sellerdata)
         sellerdata["username"]=sessionStorage.getItem("username")
         console.log(sellerdata)
         if(sellerdata.name.length>0 && sellerdata.email.length>0 && sellerdata.password.length>0 && sellerdata.District.length>0 && sellerdata.RegisterDate.length>0 && sellerdata.mandal.length>0 && sellerdata.gender.length>0 && sellerdata.phoneno.length>0 && sellerdata.state.length>0 && sellerdata.usercode.length>0 && sellerdata.zipcode.length>0){
            let res=await postdata(sellerdata)
            if(res.data.submit==true){
               alert("seller Registered");
               setseller(intialdata)
            }
            else{
               alert("data not sent");
            }
         }
         else{
            alert("Enter Required Data")
         }
    }
    
    return <>
    <style>{`body {     background: linear-gradient(45deg , #0e1023, #617587); height:97vh; }`}</style>
      <div className={style.container}>
        <div className={style.title}>Add Seller</div>
        <form>
            <div className={style.user}>
                <div className={style.input}>
                    <span className={style.details}>FullName</span>
                    <input type="text" placeholder="Enter name" name="name"  value={sellerdata.name} onChange={inputchange} required />
                    </div>
                     
                <div className={style.input}>
                    <span className={style.details}>Email</span>
                    <input type="email" placeholder="Enter Email" name="email"  value={sellerdata.email} onChange={inputchange}  required />
                     </div>
              
                <div className={style.input}>
                    <span className={style.details}>Password</span>
                    <input type="password" placeholder="Enter password" name="password"  value={sellerdata.password}  onChange={inputchange}  required />
                    </div>
                    
                <div className={style.input}>
                    <span className={style.details}>Usercode</span>
                    <input type="text" placeholder="usercode" name="usercode"  value={sellerdata.usercode} onChange={inputchange}   required />
                    </div>
                    
                <div className={style.input}>
                    <span className={style.details}>Phonenumber</span>
                    <input type="text" placeholder="phonenumber" name="phoneno"  value={sellerdata.phoneno} onChange={inputchange}  required />
                    </div>
                    
                <div className={style.input}>
                    <span className={style.details}>Street</span>
                    <input type="text" placeholder="street" name="street"    value={sellerdata.street} onChange={inputchange}  required />
                </div>
                <div className={style.input}>
                    <span className={style.details}>Village</span>
                    <input type=" text" placeholder="village" name="village"  value={sellerdata.village} onChange={inputchange}  required />
                </div>
                <div className={style.input}>
                    <span className={style.details}>Mandal</span>
                    <input type=" text" placeholder="mandal" name="mandal"  value={sellerdata.mandal}  onChange={inputchange}  required />
                </div>
                <div className={style.input}>
                    <span className={style.details}>District</span>
                    <input type="text" placeholder="District" name="District"  value={sellerdata.District} onChange={inputchange}    required />
                </div>
                <div className={style.input}>
                    <span className={style.details}> State</span>
                    <input type=" text" placeholder="State" name="state"  value={sellerdata.state} onChange={inputchange}  required />
                </div>
                <div className={style.input}>
                    <span className={style.details}>Zipcode</span>
                    <input type=" text" placeholder="zipcode" name="zipcode"   value={sellerdata.zipcode}  onChange={inputchange}  required />
                </div>
                <div className={style.datereg}>
                    <label>Register</label>
                    <input type="date"  name="RegisterDate" value={sellerdata.RegisterDate} onChange={inputchange}  />
                </div>
                <div className={style.genreg}>
                    <div className={style.gender}  value={sellerdata.gender} onChange={inputchange} >
                        <label>Gender</label>  
                        <input type="radio" name="gender" value="male" />Male
                        <input type="radio" name="gender" value="female"  />Female
                        <input type="radio" name="gender" value="other"  />Other
                    </div>
                   
                </div>
            </div>
            <div className={style.button}>
                <input type="submit" onClick={handle} value="Add Seller" />
            </div>
            </form>
            </div>
    </>
}
export default Addseller;