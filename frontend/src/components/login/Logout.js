import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../methods/methods";

function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
        getData("logout").then(data => {
            navigate("/login")
        })
    }, []);

    return <>
        <p>Logging Out...</p>
    </>
}

export default Logout