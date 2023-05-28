import { Link, useParams } from "react-router-dom";
import "./Company.scss";
import { useEffect, useState } from "react";
import { getCompanyById } from "../../services/companyServices";
import { getJobsByIdCompany } from "../../services/jobsServices";
import { Button, Card, Col, Row, Tag } from "antd";
function Company() {
    const param = useParams();
    const [company, setCompany] = useState([]);
    const [job, setJob] = useState([]);
    const [updateJob, setUpdateJob] = useState([]);
    const { id } = param;
    useEffect(() => {
        const fetchApi = async () => {
            setCompany(await getCompanyById(id));
            setJob(await getJobsByIdCompany(id));
        };
        fetchApi();
    }, []);
    useEffect(() => {
        if (job !== undefined) {
            const updateJobs = job.map((jobItem, index) => {
                const companyItemData = company.find(
                    (companyItem) =>
                        parseInt(jobItem.idCompany) === parseInt(companyItem.id)
                );

                return {
                    ...jobItem,
                    companyName: companyItemData.companyName,
                };
            });
            setUpdateJob(updateJobs);
        }
    }, [company, job]);
 
    return (
        <>
            {company.length > 0 && (
                <Card className="company">
                    <Row gutter={20}>
                        <Col className="company__header" span={24}>
                            <Button className="button-back">
                                <Link to="#" onClick={() => window.history.back()}>
                                    Quay lại
                                </Link>
                            </Button>
                        </Col>
                        <Col className="company__info" span={24}>
                            <h1>{company[0].companyName}</h1>
                            <p>
                                Địa Chỉ: <strong>{company[0].address}</strong>
                            </p>
                            <p>
                                Số Lượng Nhân Sự: <strong>{company[0].quantityPeople}</strong>
                            </p>
                            <p>
                                Thời Gian Làm Việc: <strong>{company[0].workingTime}</strong>
                            </p>
                            <p>
                                Link Website: <strong>{company[0].website}</strong>
                            </p>
                            <p>Mô Tả Ngắn: </p>
                            <p>
                                <i>{company[0].description}</i>
                            </p>
                            <p>Mô Tả Chi Tiết: </p>
                            <p>
                                <i>{company[0].detail}</i>
                            </p>
                        </Col>
                        <Col className="company__jobs" span={24}>
                            <p style={{ textAlign: "center" }}>
                                <strong>Danh Sách Các Jobs</strong>
                            </p>
                            <Row gutter={[20, 20]}>
                                {updateJob.map((data, index) => (
                                    <Col key={data.id} className="search__item" span={8}>
                                        <Link
                                            to={`/detail-job/${data.id}`}
                                            className="search__item-link"
                                        >
                                            <Card className="search__itemBox">
                                                <div className="search__item-name">
                                                    <h4>{data.companyName}</h4>
                                                </div>
                                                <div className="search__item-list">
                                                    <p>
                                                        Ngôn Ngữ:{" "}
                                                        {data.tags.map((dataTags, index) => (
                                                            <Tag key={index} color="blue">
                                                                {dataTags}
                                                            </Tag>
                                                        ))}
                                                    </p>
                                                    <p>
                                                        Thành Phố:{" "}
                                                        {data.city.map((dataCity, index) => (
                                                            <Tag key={index} color="gold">
                                                                {dataCity}
                                                            </Tag>
                                                        ))}
                                                    </p>
                                                    <p>
                                                        Mức Lương: <strong>{data.salary}</strong>{" "}
                                                    </p>
                                                    <p>
                                                        Công Ty: <strong>{data.idCompany}</strong>{" "}
                                                    </p>
                                                    <p>
                                                        Ngày Tạo: <strong>{data.createAt}</strong>{" "}
                                                    </p>
                                                </div>
                                            </Card>
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Card>
            )}
        </>
    );
}
export default Company;
