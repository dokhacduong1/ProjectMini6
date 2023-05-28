import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobsById } from "../../services/jobsServices";
import { Button, Card, Row, Col, Tag } from "antd";
import "./DetailJob.scss";
import { getCookie } from "../../helpers/cookie";
function DetailJob() {
    const token = getCookie("token");
    const param = useParams();
    const [job, setJob] = useState([]);
    const { id } = param;
    useEffect(() => {
        const fetchApi = async () => {
            setJob(await getJobsById(id));
        };
        fetchApi();
    }, []);

    return (
        <>
            <Card className="detailJob">
                {job.length > 0 && (
                    <>
                        <Row gutter={20} className="createJob__header">
                            <Col className="createJob__header-item" span={24}>
                                <div className="detailJob__header-boxitem">
                                    <Button className="button-back">
                                        <Link to="#" onClick={() => window.history.back()}>
                                            Quay lại
                                        </Link>
                                    </Button>
                                    {!token && <Button className="detailJob__header-button" style={{backgroundColor:"black",color:"white"}}><Link to={`/apply-job/${id}`}>Nộp CV</Link></Button>}
                                </div>

                                <h3>Tên Job: {job[0].name}</h3>
                            </Col>
                            <Col className="createJob__header-item" span={24}>
                                <p>
                                    Trạng Thái:{" "}
                                    {job[0].status ? (
                                        <Tag color="green">Đang Bật</Tag>
                                    ) : (
                                        <Tag color="red">Đang Tắt</Tag>
                                    )}
                                </p>
                            </Col>
                            <Col className="createJob__header-item" span={24}>
                                <p>
                                    Tags:{" "}
                                    {job[0].tags.map((data, index) => (
                                        <Tag key={index} color="blue">
                                            {data}
                                        </Tag>
                                    ))}
                                </p>
                            </Col>
                            <Col className="createJob__header-item" span={24}>
                                <p>
                                    Mức Lương: <strong>{job[0].salary}</strong>
                                </p>
                            </Col>
                            <Col className="createJob__header-item" span={24}>
                                <p>
                                    Cập Nhật: <strong>{job[0].updateAt}</strong>
                                </p>
                            </Col>
                            <Col className="createJob__header-item" span={24}>
                                <p>
                                    Thành Phố:{" "}
                                    {job[0].city.map((data, index) => (
                                        <Tag key={index} color="gold">
                                            {data}
                                        </Tag>
                                    ))}
                                </p>
                            </Col>
                            <Col className="createJob__header-item" span={24}>
                                <p>Mô Tả:</p>
                                <i>{job[0].description}</i>
                            </Col>
                        </Row>
                    </>
                )}
            </Card>
        </>
    );
}
export default DetailJob;
