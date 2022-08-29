import icon from "../images/icon_admin.png";
import { Link } from "react-router-dom";
import logo from '../admin/crce-logo.svg'


const navData = [
    {"data":"DASHBOARD", "link":"/admin"},
    {"data":"LOGOUT", "link":"/logout"},
]

function NavLinks(props) {
    const data = props.data;
    console.log(data)
    const links = data.map((obj, i) =>
        <li className="nav-item py-2" key={obj["link"] + "i"}>
            <Link to={obj["link"]} className="nav-link" role={"button"}>{obj["data"]}</Link>
        </li>
    );
    return links;
}

function NavbarLight() {
    return <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
            <Link to={"/"} className="navbar-brand" role={"button"}><img src={icon} height="60" /><img src={logo} height="60" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <NavLinks data={navData}/>
                </ul>
                
            </div>
        </div>
    </nav>
}
export default NavbarLight;