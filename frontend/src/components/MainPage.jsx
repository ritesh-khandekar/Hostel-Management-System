import './mainstyle.css'
import icon from './images/icon.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faCoffee} from '@fortawesome/free-solid-svg-icons';


// import bg from "./images/bg_img.webp"
function MainPage() {
    return <>
        <div className="navbar py-3 px-lg-3 mx-4">
            <div className="items-left">
                <Link className='' to={'/'}><img className='' src={icon} height="60" /></Link>
            </div>
            <div className="items-right">
                <Link className='btn btn-outline-primary active mx-1 mx-lg-2 px-lg-4 rounded-5' to={'/'}>Home</Link>
                <Link className='btn btn-outline-primary px-lg-4 mx-1 mx-lg-2 rounded-5' to={'/login'}>Login</Link>
            </div>
        </div>
        <div className="container_main">
            <div className="block_main">
                <h1 className='text-uppercase'>Hostel Management Portal</h1>
                <p className="text-info_main">
                    We have created an awesome app to takle the problems related to hostels. Tighten your seat belt to go into a fascinating journy.
                </p>
                <Link className="btn_main display-3 btn-primary text-decoration-none shadow" to={"/login"}>Get Started <FontAwesomeIcon icon={ faAnglesRight } /></Link>
            </div>
        </div>
    </>
}
export default MainPage;