import "./SliderHome.scss"
import {  Menu } from 'antd';
import { UserOutlined, FieldTimeOutlined,BarsOutlined,FileDoneOutlined,HomeOutlined } from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";
function SliderHome(){
  const location =useLocation()
console.log(location)
    function getItem(key,label, icon, children) {
        return {
          key,
          icon,
          label,
          children,
          
        };
      }
    const items = [
        getItem('/',<Link to="home">Home</Link> , <HomeOutlined />),
        getItem('/admin',<Link to="admin">Tổng Quan</Link> , <FieldTimeOutlined />),
        getItem('/info-company',<Link to="info-company">Thông Tin Công Ty</Link> , <UserOutlined />),
        getItem('/job-manage',<Link to="job-manage">Quản Lý Việc Làm</Link>, <BarsOutlined />),
        getItem('/cv-manage',<Link to="cv-manage">Quản Lý CV</Link>, <FileDoneOutlined />),
      ];
    return(
        <>
             <Menu className="layout__slider-menu"
               
                defaultSelectedKeys={location.pathname}
                defaultOpenKeys={['sub1']}

                items={items}
            />
        </>
    )
}
export default SliderHome