import { Button, Card, Col, Form, Input, Row,notification  } from "antd";
import "./InfoCompany.scss";

import { useEffect, useState } from "react";
import { editInfoCompanyById, getCompanyById } from "../../services/companyServices";
import { getCookie } from "../../helpers/cookie";



function InfoCompany() {
    const { TextArea } = Input;
    const idCompany = getCookie("id");
    const [company, setCompany] = useState([]);
    const [checkForm , setCheckForm] = useState(true);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const fetchData = async () => {
        setCompany(await getCompanyById(idCompany));
    };

    useEffect(() => {
        fetchData();
    }, []);
    const checkPhoneNumber = (garbageValue, value) => {

        // Sử dụng biểu thức chính quy để kiểm tra định dạng số điện thoại
        const phoneRegex = /^[0-9]{10}$/;

        if (!phoneRegex.test(value)) {
            // Trả về Promise bị từ chối nếu không hợp lệ
            return Promise.reject('Please enter a valid phone number');
        }

        return Promise.resolve();
    }
    const handleFinish = async (infoForm) => {
     
        const respone = await editInfoCompanyById(idCompany,infoForm);
        if(respone){
            api.success({
                message: `Cập Nhật Thành Công`,
                description: <>Bạn Đã Cập Nhật <strong>{infoForm.companyName}</strong></>,
                
               
              });
        }
    };
  
   
    const handleReload = async ()=>{    
        fetchData();
        await setTimeout(()=>{
            form.resetFields();
           
        },2000)
        
    }
    
   
    return (
        <>
             {contextHolder}
            <Card className="infoCompany">
                <Row gutter={20}>
                    <Col className="infoCompany__header" span={24}>
                        <h3>Thông Tin Công Ty</h3>
                        <Button className="infoCompany__header-button" onClick={()=>{setCheckForm(!checkForm)}}>{checkForm ? <span>Chỉnh Sửa</span> : <span onClick={handleReload}>Hủy</span>}</Button>
                    </Col>
                    <Col className="infoCompany__form" span={24}>
                        {
                            company.length > 0 && (<>

                                <Form
                                    form={form}
                                    disabled={checkForm}
                                    name="form-company"
                                    initialValues={company[0]}
                                    rules={{
                                        remember: true,
                                    }}
                                    style={{
                                        width: "100%",
                                    }}
                                    layout="vertical"
                                    onFinish={handleFinish}
                                
                                >
                                    <Row gutter={20}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Tên Công Ty"
                                                name="companyName"
                                                rules={[{ required: true }]}
                                            >
                                                <Input placeholder="Input Name Company" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={8}>
                                            <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please input your Email!",
                                                        type: "email",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Input Email"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                label="Số Điện Thoại"
                                                name="phone"
                                                rules={[
                                                    {
                                                        required: true,
                                                        validator: checkPhoneNumber,
                                                        type: "number"
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="Input Phone" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                label="Địa Chỉ"
                                                name="address"
                                                rules={[{ required: true,
                                                    message: "Please input your Address!", }]}
                                            >
                                                <Input placeholder="Input Address"  />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={20}>
                                        <Col span={8}>
                                            <Form.Item
                                                label="Số Lượng Nhân Sự"
                                                name="quantityPeople"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please input your Quantity People!",
                                                       
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Input Quantity People" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                label="Thời Gian Làm Việc"
                                                name="workingTime"
                                                rules={[{ required: true,
                                                    message: "Please input your Working Time!", }]}
                                            >
                                                <Input placeholder="Input Working Time" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                label="Link Website"
                                                name="website"
                                                rules={[{ required: true }]}
                                            >
                                                <Input placeholder="Input Website" />
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                    <Row gutter={20}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Mô Tả Ngắn"
                                                name="description"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please input your Description!",
                                                    },
                                                ]}
                                            >
                                                <TextArea rows={4}  />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={20}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Mô Tả Chi Tiết"
                                                name="detail"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please input your Detail!",
                                                    },
                                                ]}
                                            >
                                                <TextArea rows={4} />


                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="login__form-button"
                                        >
                                            Log in
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </>)
                        }

                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default InfoCompany;
