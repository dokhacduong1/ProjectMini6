import { useEffect, useState } from "react"
import { getJobs, getJobsByIdCompany } from "../../services/jobsServices";
import { getCv, getCvByIdCompany } from "../../services/cvServices";
import { getCompany, getCompanyById } from "../../services/companyServices";
import { getCookie } from "../../helpers/cookie";
import { Card, Col, Row } from 'antd';
import { useParams } from "react-router-dom";
function Admin() {
    const [job, setJob] = useState([]);
    const [cv, setCv] = useState([]);
    const [company, setCompany] = useState([]);
    const idCompany = getCookie("id")
   
    useEffect(() => {
        const fechApi = async () => {
            setJob(await getJobsByIdCompany(idCompany));
            setCv(await getCvByIdCompany(idCompany));
            setCompany(await getCompanyById(idCompany));
            // }
        }
        fechApi()
    }, [])
    const statusCheckJob = job.filter(data => data.status === true);
    const statusCheckCv = cv.filter(data => data.statusRead === true);
    return (
        <>
            <div className="admin">
                <h3>Tổng Quan</h3>
                {
                    company.length > 0 && (<>
                        <Row gutter={20}>
                            <Col span={8}>
                                <Card>
                                    <h4>Job</h4>
                                    <p>Số Lượng Job: <strong>{job.length}</strong></p>
                                    <p>Job Đang Bật: <strong>{statusCheckJob.length}</strong></p>
                                    <p>Job Đang Tắt: <strong>{job.length - statusCheckJob.length}</strong></p>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card>
                                    <h4>Cv</h4>
                                    <p>Số Lượng Cv: <strong>{cv.length}</strong></p>
                                    <p>Cv Chưa Đọc: <strong>{statusCheckCv.length}</strong></p>
                                    <p>Cv Đã Đọc: <strong>{cv.length - statusCheckCv.length}</strong></p>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card>
                                    <h4>Thông Tin {company[0].companyName}</h4>
                                   
                                    <p>Email: <strong>{company[0].email}</strong></p>
                                    <p>Số Điện Thoại: <strong>{company[0].phone}</strong></p>
                                    <p>Số Nhân Viên: <strong>{company[0].quantityPeople}</strong></p>
                                </Card>
                            </Col>

                        </Row>

                    </>)
                }

            </div>
        </>
    )
}
export default Admin