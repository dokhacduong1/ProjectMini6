import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import { useDispatch } from "react-redux";
import "./LogoutAndAdmin.scss"
import { auth } from "../../action/auth"
import { deleteAllCookies, getCookie } from "../../helpers/cookie";
import { useState } from "react";
function LogoutAndAdmin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const companyName = getCookie("companyName")
    const handleLogout = () => {
        dispatch(auth(false));
        deleteAllCookies();
        navigate("/login");
    }
  
    return (
        <>
            <div className="header__account-button" style={{display:"flex"}}>
                <Button className="header__account-button-p">Admin</Button>
                <Button className="header__account-button-p" onClick={handleLogout}>Logout</Button>
            </div>

        </>
    )
}
export default LogoutAndAdmin