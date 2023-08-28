import { useEffect, useState } from "react";
import './login.css';
import { logindata } from "../services/service";
import { useNavigate } from 'react-router-dom';
function Login(){
    const naviagte=useNavigate();
    const [formdata,setformdata]=useState({
        username:'',
        password:''
    })
    let handle=async(e)=>{
      e.preventDefault();
      console.log(formdata.username,formdata.password);
      let res=await logindata(formdata)
      if(res.data.success==true){
        alert("login successfull");
        sessionStorage.setItem("uname",res.data.name);
        sessionStorage.setItem("username",formdata.username)
        naviagte('/dashboard');
      }
      else{
        alert("incorrect credentials")
      }
    }
    let inputchange=(e)=>{
        const {name,value}=e.target;
        setformdata( {...formdata,[name]:value})
    }
    return(
        <>
        <div className="form">
         <div className="log">
            <h1>admin login</h1>
            <form>
            <div className="control">
            <label>UserName</label>
                   <input type="text" name="username" value={formdata.username} onChange={inputchange}/>
                </div>
                <div className="control">
            <label>Password</label>
                   <input type="password" name="password" value={formdata.password} onChange={inputchange}/>
                </div>
                <button class="btn" onClick={handle}>Login</button>
            </form>
        </div>
        </div>
        </>
    )
}
export default Login;