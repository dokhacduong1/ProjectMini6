import { Button, Card, Form, Input, Row, Select, Tag, Col } from "antd";
import "./Home.scss";
import { useEffect, useState } from "react";
import { getCity } from "../../services/cityServices";
import { getTags } from "../../services/tagServices";
import { SearchOutlined } from "@ant-design/icons";
import { getCompany } from "../../services/companyServices";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [city, setCity] = useState([]);
  const [tags, setTags] = useState([]);
  const [companys, setCompany] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCity();
      const newArray = [{ value: "", label: "All" }];
      response.map((data, index) => {
        const dataNew = {
          value: data.value,
          label: data.value,
        };
        newArray.push(dataNew);
      });

      setCity(newArray);
      setTags(await getTags());
      setCompany(await getCompany());
    };
    fetchApi();
  }, []);

  const handleForm = async (infoForm) => {
    console.log(infoForm);
    navigate(`/search?city=${infoForm.city}&keyword=${infoForm.keyword}`);
  };
  const handleFinish = (value) => {
    console.log(value);
  };
  const handeleTagsClick = (value) => {
    navigate(`/search?city=&keyword=${value.target.innerText}`);
  };
  return (
    <>
      <Card className="home">
        <div className="home__welcome">
          <div className="home__welcome-header">
            <h2>Chào Mừng Bạn Đến Với Trang Xin Việc Của Dương</h2>
          </div>
        </div>
        <Form
          className="home__welcome-form"
          layout="inline"
          rules={{
            remember: true,
          }}
          onFinish={handleForm}
        >
          <Form.Item name="city">
            <Select
              options={city}
              style={{ width: 170 }}
              placeholder="Chọn Thành Phố"
              className="home__welcome-form-select"
            />
          </Form.Item>
          <Form.Item name="keyword">
            <Input
              style={{ width: 230 }}
              className="home__welcome-form-input"
              placeholder="Nhập Từ Khóa..."
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="home__welcome-form-button"
              type="primary"
              htmlType="submit"
            >
              <SearchOutlined /> Search
            </Button>
          </Form.Item>
        </Form>
        <div className="home__welcome-tags">
          {tags.length > 0 && (
            <>
              {tags.map((data, index) => (
                <Tag
                  onClick={handeleTagsClick}
                  className="home__welcome-tags-list"
                  key={data.key}
                  color="red"
                >
                  {data.value}
                </Tag>
              ))}
            </>
          )}
        </div>
        <div className="home__welcome-infoCompany">
          <h3>Danh Sách Một Số Công Ty</h3>
          <Row gutter={16}>
            {companys.length > 0 && (
              <>
                {companys.map((data, index) => (
                  <Col key={data.id} className="" span={8} order={4}>
                    <Link to={`/company/${data.id}`}>
                      <Card className="home__welcome-infoCompany-card">
                        <p>
                          Công Ty: <strong>{data.companyName}</strong>
                        </p>
                        <p>
                          Số Nhân Sự: <strong>{data.quantityPeople}</strong>
                        </p>
                        <p>
                          Địa Chỉ: <strong>{data.address}</strong>
                        </p>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </>
            )}
          </Row>
        </div>
      </Card>
    </>
  );
}
export default Home;
