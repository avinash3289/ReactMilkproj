import axios from 'axios';
const url="http://localhost:5000/sellerregister";
export async function logindata(data){
    return await axios.post("http://localhost:5000/stores",data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
}
export async function postdata(data){
    return await axios.post(url,data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
}
export async function getdata(id){
    return await axios.get("http://localhost:5000/getvalues/"+id)

      
}
export async function getseller(id){
    return await axios.get("http://localhost:5000/getuser/"+id)  
}
export async function deluser(id){
    return await axios.delete("http://localhost:5000/deluser/"+id)
}
export async function updateuser(id,data){
    return await axios.put("http://localhost:5000/update/"+id,data)
}

export async function milkpostdata(data){
    return await axios.post("http://localhost:5000/milkcollection",data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
}

export async function getmilk(id){
    return await axios.get("http://localhost:5000/getmilk/"+id)
}
export async function insertrate(data){
    return await axios.post("http://localhost:5000/ratecharts",data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
}
export async function updaterate(id,data){
    return await axios.put("http://localhost:5000/uprate/"+id,data)
}
export async function billgenerate(id,data){
    return await axios.post("http://localhost:5000/genbill/"+id,data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
}
export async function payments(id,data){
    return await axios.post("http://localhost:5000/payment/"+id,data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
}
export async function getpayment(id){
    return await axios.get("http://localhost:5000/getpay/"+id)  
}
export async function getprofile(id){
    return await axios.get("http://localhost:5000/getadmininfo/"+id)  
}
export async function updateprofile(id,data){
     return await axios.put("http://localhost:5000/adminprofile/"+id,data)
}