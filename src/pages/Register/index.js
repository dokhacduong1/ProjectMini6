import { Button, Form, Input, message } from "antd";
import "./Register.scss"
import { checkEmail } from "../../services/companyServices";
import { generateToken } from "../../helpers/generateToken";
import { Post } from "../../utils/request";
import { useNavigate } from "react-router-dom";
function Register() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const checkPhoneNumber = (garbageValue, value) => {

        // Sử dụng biểu thức chính quy để kiểm tra định dạng số điện thoại
        const phoneRegex = /^[0-9]{10}$/;

        if (!phoneRegex.test(value)) {
            // Trả về Promise bị từ chối nếu không hợp lệ
            return Promise.reject('Please enter a valid phone number');
        }

        return Promise.resolve();
    }
    const handleRegister = async (infoUser) => {
        const reponse = await checkEmail(infoUser.email);
        if (reponse.length === 0) {
            const tokenRandom = generateToken();
            const infoUserNew = {
                ...infoUser,
                token: tokenRandom
            }

            Post("company", infoUserNew);
            messageApi.open({
                type: 'success',
                content: 'Đăng Ký Thành Công',
            });
            setTimeout(() => {
                navigate("/login")
            }, 1000)
        } else {
            messageApi.open({
                type: 'warning',
                content: 'Email Đã Tồn Tại!',
            });
        }

    }
    return (
        <>
            {contextHolder}
            <div className="register">
                <Form className="register__form"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        maxWidth: 300,
                    }}
                    onFinish={handleRegister}
                >
                    <h3>Register</h3>
                    <Form.Item
                        label="Company Name"
                        name="companyName"
                        rules={[
                            {
                                required: true, message: 'Please input your Company Name!'
                            }
                        ]}
                    >
                        <Input placeholder="Công Ty xxx" className="register__form-input" />
                    </Form.Item>
                    <Form.Item name="email " label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                                type: 'email',
                            },
                        ]}
                    >
                        <Input placeholder="contact@abc.com" className="register__form-input" />
                    </Form.Item>

                    <Form.Item name="password" label="Password"
                        rules={[
                            {
                                required: true, message: 'Please input your password!'
                            }
                        ]}
                    >
                        <Input.Password placeholder="123456" className="register__form-input" />

                    </Form.Item>
                    <Form.Item name="phone" label="Phone"
                        rules={[
                            {
                                required: true,
                                validator: checkPhoneNumber,
                                type: "number"
                            }
                        ]}
                    >
                        <Input placeholder="0123456789" className="register__form-input" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register__form-button">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </>
    )
}
export default Register;