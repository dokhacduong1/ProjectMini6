import {
    Card,
    Row,
    Col,
    Button,
    Form,
    Input,
    Select,
    Switch,
    notification,
} from "antd";
import "./CreateJob.scss"
import { useEffect, useState } from "react";
import { getCity } from "../../services/cityServices";
import { getTags } from "../../services/tagServices";
import { getCurrentDateTime } from "../../helpers/dataTime";
import { getCookie } from "../../helpers/cookie";
import { createJobs } from "../../services/jobsServices";
import { Link } from "react-router-dom";
function CreateJob() {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [city, setCity] = useState([]);
    const [tags, setTags] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const idCompany = getCookie("id");
    useEffect(() => {
        const fetchApi = async () => {
            setCity(await getCity());
            setTags(await getTags());
        };
        fetchApi();
    }, []);

    const handleFinish = async (infoForm) => {
        infoForm.idCompany = idCompany;
        infoForm.createAt = getCurrentDateTime();
        infoForm.updateAt = "";

        const response = await createJobs(infoForm);
        if (response) {
            form.resetFields();
            api.success({
                message: `Tạo Thành Công`,
                description: (
                    <>
                        Bạn Đã Tạo Thành Công Job <strong>{infoForm.name}</strong>
                    </>
                ),
            });
        }
    };

    return (
        <>
            {contextHolder}
            <Card className="createJob">
                <Row gutter={20}>
                    <Col className="createJob__header" span={24}>
                        <Button className="button-back">
                            <Link to="#" onClick={() => window.history.back()}>
                                Quay lại
                            </Link>
                        </Button>
                        <h3>Tạo Job Mới</h3>
                    </Col>
                    <Col className="createJob__form" span={24}>
                        <Form
                            form={form}
                            name="form-job"
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
                                            defaultChecked
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
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </>
    );
}
export default CreateJob;
