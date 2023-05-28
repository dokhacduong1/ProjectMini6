import {
    Card,
    Row,
    Col,
    Button,
    Form,
    Input,
    Select,
    Switch,
    Modal,
    notification
} from "antd";

import { useEffect, useState } from "react";
import { getCity } from "../../services/cityServices";
import { getTags } from "../../services/tagServices";
import { EditOutlined } from "@ant-design/icons";
import { updateJobs } from "../../services/jobsServices";
import { getCurrentDateTime } from "../../helpers/dataTime";
function FormEditJobs(props) {
    const { record,fetchApiLoad } = props;
    const { TextArea } = Input;
    const [city, setCity] = useState([]);
    const [tags, setTags] = useState([]);
    const [isModal, setIsModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const fetchApi = async () => {
        setCity(await getCity());
        setTags(await getTags());
    };
    useEffect(() => {
        
        fetchApi();
    }, []);

    const handleFinish = async (infoForm) => {   
        infoForm.updateAt = getCurrentDateTime();
         const response = await updateJobs(record.id,infoForm)
         if (response) {
            form.resetFields();
            fetchApiLoad();
            setIsModalOpen(false);
            api.success({
                message: `Cập Nhật Thành Công`,
                description: (
                    <>
                        Bạn Đã Tạo Thành Công Job <strong>{infoForm.name}</strong>
                    </>
                ),
            });
        }

        
     };
    const handleShowModal = () => {
        form.resetFields();
        setIsModalOpen(true);
       
    };
 

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
       
    };
    return (
        <>
        {contextHolder}
            <EditOutlined
                onClick={() => {
                    handleShowModal();
                }}
            />
            <Modal
                title="Chỉnh Sửa Jobs"
                open={isModal}
               
                onCancel={handleCancel}
                footer={null}
            >
                <Card className="createJob">
                    <Row gutter={20}>
                        <Col className="createJob__form" span={24}>
                            {record && (
                                <>
                                    <Form
                                        initialValues={record}
                                        name="form-job"
                                        rules={{
                                            remember: true,
                                        }}
                                        style={{
                                            width: "100%",
                                        }}
                                        layout="vertical"
                                        onFinish={handleFinish}
                                        form={form}
                                    >
                                        <Row gutter={20}>
                                            <Col span={24}>
                                                <Form.Item
                                                    label="Tên Job"
                                                    name="name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please input your Name Job!",
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Input Name Company" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col span={16}>
                                                <Form.Item
                                                    label="Tags"
                                                    name="tags"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please input your Tags!",
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        mode="multiple"
                                                        placeholder="Please select Tags"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        options={tags}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    label="Mức Lương"
                                                    name="salary"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please input your Dalary!",
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Input Salary" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col span={24}>
                                                <Form.Item
                                                    label="Thành Phố"
                                                    name="city"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please input your City!",
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        mode="multiple"
                                                        placeholder="Please select City"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        options={city}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col span={24}>
                                                <Form.Item
                                                    label="Mô Tả"
                                                    name="description"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please input your Description!",
                                                        },
                                                    ]}
                                                >
                                                    <TextArea rows={10} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col span={24}>
                                                <Form.Item label="Trạng Thái" name="status">
                                                    <Switch
                                                        checkedChildren="Bật"
                                                        unCheckedChildren="Tắt"
                                                        defaultChecked = {record.status}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="createJob__form-button"
                                            >
                                               Cập Nhật
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </>
                            )}
                        </Col>
                    </Row>
                </Card>
            </Modal>
        </>
    );
}
export default FormEditJobs;
