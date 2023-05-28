import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { searchJobs } from "../../services/jobsServices";
import { Card, Row, Col, Tag, Button } from "antd";
import { getCompany } from "../../services/companyServices";
import "./Search.scss";
function Search() {
    //Đoạn này sẽ lấy được hết param của url
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const city =
        searchParams.get("city") !== "undefined" ? searchParams.get("city") : "";
    const keyword =
        searchParams.get("keyword") !== "undefined"
            ? searchParams.get("keyword")
            : "";

    const [job, setJob] = useState([]);
    const [company, setCompany] = useState([]);
    const [updateJob, setUpdateJob] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            setJob(await searchJobs(keyword, city));
            setCompany(await getCompany());
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
    }, [company]);
    console.log(updateJob)
    return (
        <>
            <div>
                <Button className="button-back">
                    <Link to="#" onClick={() => window.history.back()}>
                        Quay lại
                    </Link>
                </Button>
            </div>
            {updateJob.length > 0 ? (
                <>
                    <Card className="search">


                        <Row gutter={[10, 20]}>
                            <Col className="search__header" span={24}>
                                <h3 style={{ textAlign: "center" }}>
                                    Danh Sách Việc Làm: {""}
                                    {city !== "" && <Tag color="default"> {city}</Tag>}
                                    {keyword !== "" && <Tag color="default"> {keyword}</Tag>}
                                </h3>
                            </Col>

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
                    </Card>
                </>
            ) : (
                <>
                    <Row gutter={20}>
                        <Col className="jobManage__header" span={24}>
                            <h3>
                                Không Tìm Thấy Kết Quả:
                                {city !== "" && <Tag color="default"> {city}</Tag>}
                                {keyword !== "" && <Tag color="default"> {keyword}</Tag>}
                            </h3>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
}
export default Search;
