import { Outlet, Link } from "react-router-dom";
import style from './sellerdash.style.module.css'
function Sellerdash() {
    let name=sessionStorage.getItem('name')
    return (
        <>
            <div >
                <div class={style.stitle}>
                    <h3>Welcome {name}</h3>
                    <button type="submit" class={style.abcs}>Logout</button>
                    <div className={style.snavbar}>
                        <ul>
                            <li><Link to="home3">Dashboard</Link></li>
                            <li><Link to="milkrecords">Milkrecords</Link></li>
                            <li><Link to="paymentinfo">payments</Link></li>
                            <li><Link to="sellerprofile">Profile</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={style.contents}>
                <Outlet />
            </div>
        </>
    )
}
export default Sellerdash;