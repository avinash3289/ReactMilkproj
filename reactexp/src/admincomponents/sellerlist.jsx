import { useEffect, useState } from "react";
import { getseller, deluser, updateuser } from "../services/service";
import style from "./sellerliststyle.module.css"
function Sellerlist() {
    let id = sessionStorage.getItem("username");
    const [sellerdata, setseller] = useState({
        name: '',
        email: '',
        password: '',
        usercode: '',
        phoneno: '',
        street: '',
        village: '',
        mandal: '',
        District: '',
        state: '',
        zipcode: '',
        RegisterDate: '',
        gender: ''
    });
    const inputchange = (e) => {
        const { name, value } = e.target;
        setseller({ ...sellerdata, [name]: value })
    }
    const [openform, setform] = useState(false)
    const [user, setuser] = useState([]);
    useEffect(() => {
        getdata();
    }, [setuser])

    let editform = async (u,e) => {
        setform(true);
        setseller(u);
        
    }
    let handle = async (e) => {
        e.preventDefault();
        let res = await updateuser(sellerdata.usercode, sellerdata);
        if (res.data.submit == true) {
            alert("data updated!!!");
            getdata();
            setform(false)
        }
        else {
            alert("data not updated")
        }
    }
    let delid = async (id) => {
        let res = await deluser(id)
        if (res.data.submit == true) {
            alert("seller deleted");
            getdata();
        }
        else {
            alert("not deleted")
        }
    }
    let getdata = async () => {
        let res = await getseller(id)
        setuser(res.data.info)
        console.log(user)
    }
    return <>
<style>{`body { height:97vh; }`}</style>
        <div className={style.table}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>password</th>
                        <th>usercode</th>
                        <th>username</th>
                        <th>Phoneno</th>
                        <th>Gender</th>
                        <th>village</th>
                        <th>Mandal</th>
                        <th>District</th>
                        <th>Zipcode</th>
                        <th>State</th>
                        <th>RegisterDate</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map(
                            (u) =>(
                                 <tr key={u.id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.password}</td>
                                    <td>{u.usercode}</td>
                                    <td>{u.username}</td>
                                    <td>{u.phoneno}</td>
                                    <td>{u.gender}</td>
                                    <td>{u.village}</td>
                                    <td>{u.mandal}</td>
                                    <td>{u.District}</td>
                                    <td>{u.zipcode}</td>
                                    <td>{u.state}</td>
                                    <td>{new Date(u.RegisterDate).toLocaleDateString()}</td>
                                    <td><button onClick={() => {
                                        editform(u)
                                    }}>Edit</button></td>
                                    <td><button onClick={() => {
                                        delid(u.usercode)
                                    }} >Delete</button></td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>


        {
            openform &&
            <div className={style.formbg}>
            <div className={style.container}>
                <button className={style.btn2} onClick={() => {
                    setform(false)
                }}>X</button>
                <div className={style.title}>Edit Seller Details</div>

                <form>
                    <div className={style.user}>
                        <div className={style.input}>
                            <span className={style.details}>FullName</span>
                            <input type="text" placeholder="Enter name" name="name" value={sellerdata.name} onChange={inputchange} required />
                        </div>
                        <div className={style.input}>
                            <span className={style.details}>Email</span>
                            <input type="email" placeholder="Enter Email" name="email" value={sellerdata.email} onChange={inputchange} required />
                        </div>
                        <div className={style.input}>
                            <span className={style.details}>UserName</span>
                            <input type="text" placeholder="Enter Username" name="username" value={sellerdata.username} onChange={inputchange} required />
                        </div>
                        <div className={style.input}>
                            <span className={style.details}>Password</span>
                            <input type="password" placeholder="Enter password" name="password" value={sellerdata.password} onChange={inputchange} required />
                        </div>
                        <div className={style.input}>
                            <span className={style.details}>Usercode</span>
                            <input type="text" placeholder="usercode" name="usercode" value={sellerdata.usercode} onChange={inputchange} required />
                        </div>
                        <div className={style.input}>
                            <span className={style.details}>phonenumber</span>
                            <input type="text" placeholder="phonenumber" name="phoneno" value={sellerdata.phoneno} onChange={inputchange} required />
                        </div>
                        <div className={style.input}>
                            <span className={style.details}>street</span>
                            <input type="text" placeholder="street" name="street" value={sellerdata.street} onChange={inputchange} required />
                        </div>
                        <div className={style.input}>
                            <span className={style.details}>Village</span>
                            <input type=" text" placeholder="village" name="village" value={sellerdata.village} onChange={inputchange} required />
                        </div>
                        <div className={style.input}>
                            <span className={style.details}>Mandal</span>
                            <input type=" text" placeholder="mandal" name="mandal" value={sellerdata.mandal} onChange={inputchange} required />
                        </div>
                        <div className={style.input}>
                            <span className={style.details}>District</span>
                            <input type="text" placeholder="District" name="District" value={sellerdata.District} onChange={inputchange} required />
                        </div>
                        <div className={style.input}>
                            <span className={style.details}> State</span>
                            <input type=" text" placeholder="State" name="state" value={sellerdata.state} onChange={inputchange} required />
                        </div>
                        <div className={style.input}>
                            <span className={style.details}>Zipcode</span>
                            <input type=" text" placeholder="zipcode" name="zipcode" value={sellerdata.zipcode} onChange={inputchange} required />
                        </div>
                        <div className={style.genreg}>
                            <div>
                                <label className="ab" name="gender"  >Gender</label>
                                <input type="radio" name="gender" value="male" checked={sellerdata.gender == 'male'} onChange={inputchange} />Male
                                <input type="radio" name="gender" value="female" checked={sellerdata.gender == 'female'} onChange={inputchange} />Female
                                <input type="radio" name="gender" value="other" checked={sellerdata.gender == 'other'} onChange={inputchange} />Other
                            </div>

                        </div>
                    </div>
                    <div className={style.button}>
                        <input type="submit" onClick={handle} value="Update" />
                    </div>
                </form>
            </div>
            </div>
        }


    </>
}
export default Sellerlist;