import { Col, Row, Modal, message } from "antd";
import { useEffect, useState } from "react";
import Card from "../../components/common/Card";
import "./Dashboard.css";
import "../../components/UserCenter/Dashboard/ExerciseData";
import UserCenterSection from "../../components/UserCenter/common/UserCenterSection";
import ExerciseData from "../../components/UserCenter/Dashboard/ExerciseData";
import ActivityCard from "../../components/UserCenter/Dashboard/ActivityCard";
import DetailCard from "../../components/common/DetailCard";
import {
  getActivityDetail,
  getUserActivities,
  getUserActivityRecomendations,
  postSaveActivity,
  getUserDashboardMetrics,
} from "../../services/request/api";

const metricHolder = [
  {
    name: "Activity Minutes",
    value: "60",
    unit: "Min",
    link: "/user/dashboard",
    keyName: "num_minutes",
  },
  {
    name: "Total Days Exercised",
    value: "16",
    unit: "days",
    link: "/user/dashboard",
  },
  {
    name: "Total Calories Burned",
    value: "211",
    unit: "cals",
    link: "/user/dashboard",
  },
  {
    name: "Activities",
    value: "100",
    unit: undefined,
    link: "/user/dashboard",
    keyName: "num_activities",
  },
];

const Dashboard = () => {
  const [todoActivities, setTodoActivities] = useState(undefined);
  const [ongoingActivities, setOngoingActivities] = useState(undefined);
  const [recommendation, setRecommendation] = useState(undefined);
  const [metrics, setMetrics] = useState(undefined);

  useEffect(() => {
    const getTodo = async () => {
      const res = await getUserActivities("todo");
      setTodoActivities(res.activities);
    };

    const getDoing = async () => {
      const res = await getUserActivities("doing");
      setOngoingActivities(res.activities);
    };

    const getRecommendation = async () => {
      const res = await getUserActivityRecomendations();
      setRecommendation(res.activities);
    };

    const getMetrics = async () => {
      const res = await getUserDashboardMetrics();
      setMetrics({
        metrics: res,
      });
    };

    if (!todoActivities) {
      getTodo();
    }

    if (!ongoingActivities) {
      getDoing();
    }

    if (!recommendation) {
      getRecommendation();
    }

    if (!metrics) {
      getMetrics();
    }
  }, [metrics, ongoingActivities, recommendation, todoActivities]);

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

  const handleSave = async (id) => {
    try {
      await postSaveActivity(id);
      message.success("You saved the activity!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page--dashboard">
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
            WithSave={true}
            handleSave={handleSave}
          ></DetailCard>
        )}
      </Modal>

      <Row gutter="20">
        <Col span="12">
          <ActivityCard onGoing={false} list={todoActivities} />
        </Col>
        <Col span="12">
          <ActivityCard onGoing={true} list={ongoingActivities} />
        </Col>
      </Row>

      <UserCenterSection
        heading="Recommended For You"
        subheading="Based on your health condition, activites preferences, and  your connections"
        more="More"
        moreLink="/user/activities"
        contentPadding={true}
      >
        <div className="activity-list-wrapper">
          <div className="activity-list">
            {recommendation &&
              recommendation.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  Name={item.Name}
                  Description={item.Description}
                  imgSrc={item.ImgURL}
                  Intensity={item.Intensity}
                  Indoor={item.Indoor}
                  Size={item.Size}
                  StartDate={item.StartDate}
                  Location={item.Location}
                  WithBackground={true}
                  handleClick={handleModelClick}
                ></Card>
              ))}
          </div>
        </div>
      </UserCenterSection>

      <section className="tracker">
        <div className="activity-data-container">
          {metrics &&
            metricHolder.map((item, index) => (
              <ExerciseData
                key={index}
                name={item.name}
                value={
                  item.keyName ? metrics.metrics[item.keyName] : item.value
                }
                unit={item.unit}
                link={item.link}
              ></ExerciseData>
            ))}
        </div>
      </section>

      <section className="Measurements">
        <div className="measurements-container">
          <h1 className="measurements-header">Your Body Measurements</h1>
          <div className="body-info">
            <div className="plot-placeholder"></div>
            <div className="body-info-data">
              <div className="body-info-section body-info-weight">
                <h1 className="body-info-title">Weight (KG)</h1>
                <p className="body-info-value">90</p>
              </div>
              <div className="body-info-section">
                <h1 className="body-info-title">Height (CM)</h1>
                <p className="body-info-value">180</p>
              </div>
              <div className="body-info-section">
                <h1 className="body-info-title">Body Fat Percentage (%)</h1>
                <p className="body-info-value">21.3</p>
              </div>
              <div className="body-info-section">
                <h1 className="body-info-title">Body Mass Index (BMI)</h1>
                <p className="body-info-value">24</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
