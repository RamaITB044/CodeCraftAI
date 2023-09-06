import React from 'react'
import "./Navbar.scss"
import { useNavigate } from "react-router-dom";
import fullLogo from '../../assets/icons/codz-full-logo.svg'
import { useSelector } from 'react-redux';


const Navbar = ({ login }) => {
    const navigate = useNavigate()
    const userMetadata = useSelector((state) => state.auth.value);

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <img onClick={() => navigate("/")} src={fullLogo} alt="logo" />
                {userMetadata?.issuer ?
                    <div className="nav-links">
                        <div onClick={() => navigate("/pricing")}>Pricing</div>
                        <div className="nav-btn" onClick={() => navigate("/app")}>Go to Dashboard</div>
                    </div>
                    :
                    <div className="nav-links">
                        <div onClick={() => navigate("/pricing")}>Pricing</div>
                        {login ? <a onClick={() => navigate("/register")}><div className="nav-btn">Register</div></a> :
                            <a onClick={() => navigate("/login")}><div className="nav-btn">Login</div></a>}
                    </div>}
            </div>
        </nav>
    )
}

export default Navbar