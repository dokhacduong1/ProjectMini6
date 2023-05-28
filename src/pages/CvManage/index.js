import {
    Button,
    Card,
    Col,
    Row,
    Table,
    notification,
    Tag,
    Popconfirm,
} from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import "./CvManage.scss";
import { useEffect, useState } from "react";
import { checkReadStatusCv, deleteCv, getCvByIdCompany, viewedCv } from "../../services/cvServices";
import { getCookie } from "../../helpers/cookie";
import { getJobs, getJobsById } from "../../services/jobsServices";
function CvManage() {

    const idCompany = getCookie("id");
    const [cv, setCv] = useState([]);
    const [updatedCv, setUpdatedCv] = useState([]);
    const [jobs, setJobs] = useState([]);
    const fetchApi = async () => {
        setCv(await getCvByIdCompany(idCompany));
        setJobs(await getJobs());
    };
    useEffect(() => {
       
        fetchApi();
    }, []);
    useEffect(() => {
        const updatedCvData = cv.map((cvItem) => {
            const job = jobs.find((jobItem) => parseInt(jobItem.id) === parseInt(cvItem.idJob));
            return {
                ...cvItem,
                nameJob: job ? job.name : "", // Thêm trường nameJob vào từng phần tử của cv
            };
        }); 
        setUpdatedCv(updatedCvData); // Cập nhật mảng updatedCv với cv đã được cập nhật
    }, [jobs,cv]);
   console.log(updatedCv)
    const handeleDelete = async(idDelete) => {
        const response = await deleteCv(idDelete);
        if(response){
            fetchApi();
        }             
     };
     const handleClickStatus = async (idStatus)=>{
        const response = await checkReadStatusCv(idStatus);
        if(response.length === 0){
           const responseCv= await viewedCv(idStatus,{statusRead:true});
            if(responseCv){
                fetchApi();
            }
        }
     }
    const columns = [
        {
            title: "Tên Job ",
            dataIndex: "nameJob",
            key: "nameJob",
            align: "center",
        },
        {
            title: "Họ Tên",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Số Điện Thoại",
            dataIndex: "phone",
            key: "phone",
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
        },
        {
            title: "Ngày Gửi",
            dataIndex: "createAt",
            key: "createAt",
            align: "center",
        },
        {
            title: "Trạng Thái",
            dataIndex: "statusRead",
            key: "statusRead",
            render: (_, record) => (
                <>
                    {record.statusRead ? (
                        <Tag color="green">Đã Đọc</Tag>
                    ) : (
                        <Tag color="red">Chưa Đọc</Tag>
                    )}
                </>
            ),
            align: "center",
        },
        {
            title: "Hành Động",
            dataIndex: "address",
            key: "address",
            render: (_, record) => (
                <>
                    <div className="cvManage__table-iconAction">
                        <span onClick={()=>{
                            handleClickStatus(record.id)
                        }}
                            style={{
                                color: "black",
                                border: "1px solid black",
                                borderRadius: "4px",
                            }}
                        >
                            <EyeOutlined />
                        </span>
                        <span
                            style={{
                                color: "red",
                                border: "1px solid red",
                                borderRadius: "4px",
                            }}
                        >
                            <Popconfirm
                                title="Delete Cv"
                                description="Bạn Có Muốn Xóa Cv Này Không ?"
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
           
            <Card className="cvManage">
                <Row gutter={20}>
                    <Col className="cvManage__header" span={24}>
                        <h3>Danh Sách Việc Làm</h3>
                    </Col>
                    <Col className="cvManage__table" span={24}>
                        {updatedCv.length > 0 && (
                            <>
                                <Table
                                    rowKey={(record) => record.id}
                                    dataSource={updatedCv}
                                    columns={columns}
                                />
                            </>
                        )}
                    </Col>
                </Row>
            </Card>
        </>
    );
}
export default CvManage;
