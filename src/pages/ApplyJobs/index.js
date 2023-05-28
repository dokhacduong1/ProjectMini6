import { Card, Row, Col, Button, Form, Input,notification } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobsById } from "../../services/jobsServices";
import { getCurrentDateTime } from "../../helpers/dataTime";
import { applyCv } from "../../services/cvServices";

function ApplyJobs() {
  const { TextArea } = Input;
  const [api, contextHolder] = notification.useNotification();
  const param = useParams();
  const [job, setJob] = useState([]);
  const { id } = param;
  useEffect(()=>{
    const fetchApi = async ()=>{
        setJob(await getJobsById(id))
    }
    fetchApi();
    
  },[])
 
  const checkPhoneNumber = (garbageValue, value) => {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng số điện thoại
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(value)) {
      // Trả về Promise bị từ chối nếu không hợp lệ
      return Promise.reject("Please enter a valid phone number");
    }

    return Promise.resolve();
  };
  const handleFinish = async (infoForm) => {
    infoForm.idCompany = job[0].idCompany;
    infoForm.idJob = id;
    infoForm.statusRead = false;
    infoForm.createAt = getCurrentDateTime();
     const respone  = await applyCv(infoForm);
   if(respone){
    api.success({
        message: `Gửi Cv Thành Công`,
        description: (
            <>
                <strong>{infoForm.name}</strong> Đã Gửi Cv Thành Công Vui Lòng Đợi Phản Hồi
            </>
        ),
    });
   }
  };
  return (
    <>
      {contextHolder}
      <Card className="applyJobs">
        <Row gutter={20}>
          <Col className="applyJobs__header" span={24}>
            <Button className="button-back">
              <Link to="#" onClick={() => window.history.back()}>
                Quay lại
              </Link>
            </Button>
            <h3>Thông Tin Cv Người Ứng Tuyển</h3>
          </Col>
          <Col className="applyJobs__form" span={24}>
            <Form
              name="form-applyjobs"
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
                <Col span={6}>
                  <Form.Item
                    label="Họ Tên"
                    name="name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Số Điện Thoại"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        type: "number",
                        validator: checkPhoneNumber,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: "email" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Thành Phố"
                    name="city"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={24}>
                  <Form.Item
                    label="Giới Thiệu Bản Thân"
                    name="description"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <TextArea rows={10} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={24}>
                  <Form.Item
                    label="Danh Sách Link Project Đã Làm"
                    name="linkProject"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <TextArea rows={10} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="createJob__form-button"
                >
                  Nộp Cv
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}
export default ApplyJobs;
