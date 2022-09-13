import { useEffect, useState } from "react";
import { Button, Modal, Row, Input, message } from "antd";
import Card from "../../components/common/Card";
import "../../components/UserCenter/Recommendation/OngoingCard";
import OngoingCard from "../../components/UserCenter/Recommendation/OngoingCard";
import MoreActivityCard from "../../components/UserCenter/Recommendation/MoreActivityCard";
import UserCenterSection from "../../components/UserCenter/common/UserCenterSection";
import DetailCard from "../../components/common/DetailCard";
import {
  getActivityDetail,
  getUserActivities,
  getUserActivityRecomendations,
  postDislikeActivity,
  postFinishActivity,
  postSaveActivity,
} from "../../services/request/api";
import "./Recommendation.css";

const { Search } = Input;
const onSearch = (value) => console.log(value);

const Recommendation = () => {
  const [todoActivities, setTodoActivities] = useState(undefined);
  const [ongoingActivities, setOngoingActivities] = useState(undefined);
  const [recommendation, setRecommendation] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detail, setDetail] = useState({});

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

    if (!todoActivities) {
      getTodo();
    }

    if (!ongoingActivities) {
      getDoing();
    }

    if (!recommendation) {
      getRecommendation();
    }
  }, [ongoingActivities, recommendation, todoActivities]);

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

  const handleFinishActivity = async (ac_id) => {
    try {
      await postFinishActivity(ac_id);
      message.success("Congratulations! Your activity is finished.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
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

  const handleDislike = async (id) => {
    try {
      await postDislikeActivity(id);
      message.success("You disliked the activity!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page--recommendation">
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

      <UserCenterSection
        heading="Ongoing Activities"
        subheading="Finish your activities!"
        contentPadding={true}
      >
        <div className="ongoing-list">
          {ongoingActivities &&
            ongoingActivities.map((item) => (
              <OngoingCard
                key={item.id}
                id={item.id}
                Title={item.Name}
                Description={item.Description}
                imgSrc={item.ImgURL}
                Duration={item.Duration}
                StartDate={item.StartDate}
                handleClick={handleFinishActivity}
              ></OngoingCard>
            ))}
        </div>
      </UserCenterSection>

      <UserCenterSection
        heading="Saved Activities"
        subheading="Start doing your activities!"
        moreLink="/user/activities"
        contentPadding={true}
      >
        <div className="activity-list-wrapper">
          <div className="activity-list">
            {todoActivities &&
              todoActivities.map((item) => (
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

      <UserCenterSection
        heading="More Activities For You"
        subheading="Based on your health condition, activities preferences, and your connections"
        contentPadding={true}
      >
        <div className="search-engine">
          <Search
            placeholder="Type in any activity interesting to you"
            allowClear
            onSearch={onSearch}
            style={{ width: 1052, height: 45 }}
          />
        </div>
        <Row gutter="0">
          <Button type="default" size="small">
            {"Near me"}
          </Button>
          <Button type="default" size="small">
            {"Small group"}
          </Button>
        </Row>

        <div className="more-activity-container">
          {recommendation &&
            recommendation.map((item) => (
              <MoreActivityCard
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
                handleSave={handleSave}
                handleDislike={handleDislike}
                handleClick={handleModelClick}
              ></MoreActivityCard>
            ))}
        </div>
      </UserCenterSection>
    </div>
  );
};

export default Recommendation;
