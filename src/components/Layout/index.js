/* eslint-disable no-unused-vars */
import { Layout } from "antd";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Header from "./Header";
import FooterMain from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import Sider from "antd/es/layout/Sider";
import { getCookie } from "../../helpers/cookie";
import SliderHome from "../SliderHome";
import { useEffect, useState } from "react";
import { auth } from "../../action/auth";

const { Footer, Content } = Layout;
function LayoutMain() {
  const location = useLocation();
  const authenMain = useSelector((status) => status.authReducer);
  const dispatch = useDispatch();
  const [collapsed,setCollapsed] = useState(false);
  const token = getCookie("token");
  useEffect(()=>{
    if(token){
      dispatch(auth(true));
    }
  },[])
  return (
    <>
      <Layout>
        <Header className="layout__header" setCollapsed ={setCollapsed} collapsed ={collapsed}/>
        <Layout>
          {(token !=="") && (
            <>
              <Sider theme="light" className="layout__slider" collapsed={collapsed}>
                <SliderHome />
              </Sider>
            </>
          )}
          <Content className="layout__main">
            <Outlet />
          </Content> 
        </Layout>
        <FooterMain />
      </Layout>
    </>
  );
}
export default LayoutMain;
