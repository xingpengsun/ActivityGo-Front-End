import { useState, useEffect } from "react";
import { Button, Col, Row, Modal } from "antd";
import { useHistory } from "react-router";
import Card from "../components/common/Card";
import Advantage from "../components/common/Advantage";
import DetailCard from "../components/common/DetailCard";
import { getActivityDetail } from "../services/request/api";
import { SITE_TITLE } from "../config";

import "./Home.css";
import { getLandingPageActivties } from "../services/request/api";

const data2 = [
  {
    title: "Activity Track",
    description:
      "Track your daily wellness mesurements, help you build up healthy body",
    imgSrc:
      "https://as1.ftcdn.net/v2/jpg/03/05/20/50/500_F_305205004_yeUvJcojE4pe1nct65Lq2R0d2lclkgCZ.jpg",
    link: "/",
  },
  {
    title: "Health Record",
    description:
      "Give us your health record, we recommend best activites that fit your body status",
    imgSrc:
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/bd/90f8deecc845e29879b896daeea94a/EAA-CourseImage-01.png?auto=format%2Ccompress&dpr=1",
    link: "/",
  },
  {
    title: "Friends",
    description: "Make new friends while exercising",
    imgSrc:
      "https://static.wixstatic.com/media/4fea3d_5e959693c12a46e39b468b71636510ff~mv2.png/v1/fill/w_540,h_350,al_c,q_85,usm_0.66_1.00_0.01/respect-01.webp",
    link: "/",
  },
];

const Home = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    document.title = `${SITE_TITLE}`;
  }, []);

  useEffect(() => {
    const getActivities = async () => {
      const res = await getLandingPageActivties();
      const acts = res.activities;
      setActivities(acts);
    };
    if (activities.length === 0) {
      getActivities();
    }
  }, [activities]);

  const history = useHistory();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detail, setDetail] = useState({});

  const handleModelClick = async (id) => {
    const res = await getActivityDetail(id);
    const activity = {
      activity: res,
    };
    setDetail(activity);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="page--home">
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        width={600}
        footer={null}
        closable={false}
      >
        {detail && detail.activity && (
          <DetailCard
            id={detail.activity.id}
            Name={detail.activity.Name}
            Description={detail.activity.Description}
            imgSrc={detail.activity.ImgURL}
            StartDate={detail.activity.StartDate}
            Location={detail.activity.Address}
            Size={detail.activity.Size}
            Indoor={detail.activity.Indoor}
            Intensity={detail.activity.Intensity}
            Place={detail.activity.Indoor}
            WithSave={false}
          ></DetailCard>
        )}
      </Modal>

      <section className="activities">
        <div className="home-section-container activities-container">
          <h1 className="activities_header">Let's get MOVING!</h1>
          <h2 className="activities_sub-header">
            You may like these activities around you.
          </h2>
          <div className="activity-list-wrapper">
            <div className="activity-list">
              {activities.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  Name={item.Name}
                  Description={item.Description}
                  imgSrc={item.ImgURL}
                  Link={item.Link}
                  Intensity={item.Intensity}
                  Indoor={item.Indoor}
                  Size={item.Size}
                  StartDate={item.StartDate}
                  Location={item.Location}
                  WithBackground={false}
                  handleClick={handleModelClick}
                ></Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="introduction">
        <div className="home-section-container introduction-container">
          <div className="introduction_header">Connect with our</div>
          <div className="introduction_sub-header">Smart Suggestion</div>
          <p className="introduction_texts">
            Through our artificial intelligence, we give you a cusomized
            exercise list that works for you.
          </p>
          <div className="introduction_button">
            <Button
              type="primary"
              onClick={() => {
                history.push("/login");
              }}
            >
              Connect Now
            </Button>
          </div>
        </div>
      </section>

      <section className="habit">
        <Row className="home-section-container habit_container">
          <Col className="habit_image-container" sm={24} md={12}>
            <img
              src="https://s3.amazonaws.com/cms.ipressroom.com/338/files/201808/5b894ee1a138352221103195_A680~jogging-edit/A680~jogging-edit_e67c0e4f-b3a4-4189-826c-f4d9fc143291-prv.jpg"
              width="445"
              height="267"
              className="habit_image"
              alt="habit"
            />
          </Col>
          <Col className="habit_texts" sm={24} md={12}>
            <div className="habit_header">We change your habit</div>
            <div className="habit_sub-header">By things you love to do</div>
            <p className="habit_description">
              Love gyms and want to discorver a gym around your home? <br />
              Wish to try some hiking but doesn't know where to go? <br />
              Desire to explore farmers markets and create a healthy diet?
              <br />
              We give you best activities that fits your goal and gives you as
              much fun as we could.
            </p>
          </Col>
        </Row>
      </section>

      <section className="advantages">
        <div className="advantages-container">
          <div className="advantages-list">
            {data2.map((item) => (
              <Advantage
                key={item.title}
                title={item.title}
                description={item.description}
                imgSrc={item.imgSrc}
                link={item.link}
              ></Advantage>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
