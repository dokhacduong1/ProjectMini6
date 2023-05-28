import { Button, Dropdown, Space, Typography } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import { Link, NavLink } from "react-router-dom";
import Logout from '../../LogoutAndAdmin';
import "./HeaderBar.scss"
function HeaderBar(props) {
    const { token } = props
    let items = []
    if(token === ""){
         items = [
            {
                key: 1,
                label: <>
                    <NavLink to={"login"}>
                        Login
                    </NavLink>
                </>

            },
            {
                key: 2,
                label: <>
                    <NavLink to={"register"}>
                        Register
                    </NavLink>
                </>

            }
        
        ];
    }
    else{
         items = [
            {
                key: 1,
                label: <>
                    <NavLink to={"/"}>
                        Home
                    </NavLink>
                </>

            },
            {
                key: 2,
                label: <>
                    <NavLink to={"topic"}>
                        Topic
                    </NavLink>
                </>

            },
            {
                key: 3,
                label: <>
                    <NavLink to={"answers"}>
                        Answers
                    </NavLink>
                </>

            },
            {
                key: 4,
                label: <>
                    <Logout/>
                </>

            }
        
        ];
    }

    return (
        <>
            <Dropdown
                menu={{
                    items

                }}
                trigger={['click']}
                className='notification'
            >

                <Button className='header__bar-button' icon={<BarsOutlined />}></Button>
            </Dropdown>
        </>
    )
}
export default HeaderBar