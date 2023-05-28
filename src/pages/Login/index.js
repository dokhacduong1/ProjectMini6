import { Button, Form, Input, message } from "antd";
import "./Login.scss"
import { setCookie } from "../../helpers/cookie";
import { getUser } from "../../services/companyServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../action/auth"
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const handleFinish = async (infoInput) => {
        const response = await getUser(infoInput.email, infoInput.password);
        if (response.length > 0) {
            const time = 1;
            setCookie("id", response[0].id, time);
            setCookie("companyName", response[0].companyName, time);
            setCookie("email", response[0].email, time);
            setCookie("phone", response[0].phone, time);
            setCookie("token", response[0].token, time);
            dispatch(auth(true))
            navigate("/");
            window.location.reload();
           
        } else {
            messageApi.open({
                type: 'warning',
                content: 'Tài Khoản Hoặc Mật Khẩu Không Chính Xác',
            });
        }
    }
    return (
        <>
            {contextHolder}
            <div className="login">

                <Form className="login__form"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        maxWidth: 300,
                    }}
                    onFinish={handleFinish}
                    
                >
                    <h3>Login</h3>
                    <Form.Item name="email" label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                                type: "email"
                            }
                        ]}
                    >
                        <Input placeholder="Email" className="login__form-input" />
                    </Form.Item>

                    <Form.Item name="password" label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            }
                        ]}
                    >
                        <Input.Password placeholder="Password" className="login__form-input" />

                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login__form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </>
    );
}
export default Login;
