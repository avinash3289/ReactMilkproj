import { useState } from 'react';
import style from './sellerstyel.module.css';
import { sellerview } from '../services/service';
import { useNavigate } from 'react-router-dom';
function Seller(){
  let navigate=useNavigate()
  const [seller,setseller]=useState({
    usercode:'',
    password:''
  })
  let inputchange=(e)=>{
    const {name,value}=e.target;
    setseller({...seller,[name]:value})
  }
  let handlesubmit=async(e)=>{
    e.preventDefault();
    console.log(seller)
    let res=await sellerview(seller)
    console.log(res)
    if(res.data.submit==true){

      alert("seller login successfull....")
      sessionStorage.setItem('name',res.data.name)
      sessionStorage.setItem('usercode',seller.usercode)
      navigate('/sellerdash')
    }
    else{
      alert("incorrect credentials..!!")
    }
  }
    return<>
	 <div className={style.login_box}>
  <h2>Login</h2>
  <form> 
    <div className= {style.user_box}>
      <input type="text" name="usercode" onChange={inputchange} value={seller.usercode} required />
      <label>Usercode</label>
    </div>
    <div className= {style.user_box}>
      <input type="password" name="password"  onChange={inputchange}  value={seller.password} required />
      <label>Password</label>
    </div>
	<span className={style.links}>
		<span className= {style.lf}>
		<input type="checkbox"/>Remember me</span>
		 
	  </span>
    <button className={style.btn1} type="submit" onClick={handlesubmit}>Login</button>
  </form>
</div>
   </>
}
export default Seller;