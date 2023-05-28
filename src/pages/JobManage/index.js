import {
    Button,
    Card,
    Col,
    Tag,
    Row,
    Table,
    notification,
    Popconfirm,
} from "antd";

import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import "./JobManage.scss";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { deleteJobs, getJobsByIdCompany } from "../../services/jobsServices";
import { Link } from "react-router-dom";
import FormEditJobs from "../../components/FormEditJobs";
function JobManage() {
    const idCompany = getCookie("id");
    const [api, contextHolder] = notification.useNotification();
    const [job, setJob] = useState([]);
  
    const fetchApi = async () => {
        setJob(await getJobsByIdCompany(idCompany));
    };
    useEffect(() => {
        fetchApi();
    }, []);
    const handeleDelete = async (idJobs) => {
        const response = await deleteJobs(idJobs);
        if (!response) {
            api.success({
                message: `Xóa Thành Công`,
                description: <>Bạn Xóa Thành Công</>,
            });
        }
        fetchApi();
    };
   
    const columns = [
        {
            title: "Tên Job",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (_, record) => (
                <>
                    <Row gutter={[10, 15]}>
                        {record.tags.map((data, index) => (
                            <Col key={index} span={8}>
                                <Tag
                                    style={{ width: "100%", textAlign: "center" }}
                                    key={index}
                                    color="default"
                                >
                                    {data}
                                </Tag>
                            </Col>
                        ))}
                    </Row>
                </>
            ),
            align: "center",
        },

        {
            title: "Mức Lương",
            dataIndex: "salary",
            key: "salary",
            align: "center",
        },
        {
            title: "Thời Gian",
            dataIndex: "createAt",
            key: "createAt",
            render: (_, record) => (
                <>
                    <p>Ngày Tạo: {record.createAt}</p>
                    <p>Cập Nhật: {record.updateAt}</p>
                </>
            ),
            align: "center",
        },
        {
            title: "Trạng Thái",
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <>
                    {record.status ? (
                        <>
                            <Tag color="green">Đang Bật</Tag>
                        </>
                    ) : (
                        <>
                            <Tag color="red">Đang Tắt</Tag>
                        </>
                    )}
                </>
            ),
            align: "center",
        },
        {
            title: "Hành Động",
            dataIndex: "ok",
            key: "ok",
            render: (_, record) => (
                <>
                    <div className="jobManage__table-iconAction">
                        <span
                            style={{
                                color: "black",
                                border: "1px solid black",
                                borderRadius: "4px",
                            }}
                        >
                            <Link to={`/detail-job/${record.id}`}>
                                <EyeOutlined />
                            </Link>
                        </span>

                        <span
                            style={{
                                color: "rgb(0, 150, 45)",
                                border: "1px solid rgb(0, 150, 45)",
                                borderRadius: "4px",
                            }}
                        >                               
                               <FormEditJobs fetchApiLoad={fetchApi} record={record}/>
                          
                        </span>

                        <span
                            style={{
                                color: "red",
                                border: "1px solid red",
                                borderRadius: "4px",
                            }}
                        >
                            <Popconfirm
                                title="Delete Jobs"
                                description="Bạn Có Muốn Xóa Job Này Không ?"
                                okText="Ok"
                                cancelText="No"
                                onConfirm={() => {
                                    handeleDelete(record.id);
                                }}
                            >
                                <DeleteOutlined />
                            </Popconfirm>
                        </span>
                    </div>
                </>
            ),
            align: "center",
        },
    ];
    return (
        <>
            {contextHolder}
            <Card className="jobManage">
                <Row gutter={20}>
                    <Col className="jobManage__header" span={24}>
                        <h3>Danh Sách Việc Làm</h3>
                        <Button className="jobManage__header-button">
                            <Link to={"/create-job"}>Tạo Việc Mới</Link>
                        </Button>
                    </Col>
                    <Col className="jobManage__table" span={24}>
                        <Table
                            rowKey={(record) => record.id}
                            dataSource={job}
                            columns={columns}
                        />
                    </Col>
                </Row>
            </Card>
        </>
    );
}
export default JobManage;
