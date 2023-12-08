import { useEffect, useState } from "react"; 
import { getImages, photo } from "../services/service";
import style from './contactus.style.module.css'
function Contactus(){
    const [imag,setimages]=useState([])
    const [file,setFile]=useState(null)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
      useEffect(
        ()=>{
            getimg();
      },[]
      )
      const getimg=async()=>{
          let res=await getImages()
          console.log(res.data.img)
          setimages(res.data.img)
      }
    const uploadhandle=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', file);
        let res=await photo(formData);
        alert(res.data.message);
        getimg()
    }
      
    return(
         <>
    <div>
    <input type="file" accept="image/*" onChange={handleFileChange} />
    <button onClick={uploadhandle}>Upload Photo</button>
  </div>  
  <div className={style.imgs}>
       {imag.map(

        (m,index)=>(
          <div className={style.i}>
          < img src={`http://localhost:5000/images/`+m.images} alt="" style={{width:100,height:100}}/>
          </div>
        )
       )

       }
    </div>
  
     

         </>


 
    
       
    )
}
export default Contactus;