import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UserCenterSection from "../../components/UserCenter/common/UserCenterSection";
import PointsData from "../../components/UserCenter/Rewards/PointsData";
import GiftCard from "../../components/UserCenter/Rewards/GiftCard";
import "./Rewards.css";
import {
  getAllRewards,
  getUserPoints,
  getUserRewards,
  postRedeemReward,
} from "../../services/request/api";
import { message } from "antd";

const Redirect = <FontAwesomeIcon icon={faArrowAltCircleRight} />;

const Rewards = () => {
  const [points, setPoints] = useState(undefined);
  const [rewards, setRewards] = useState(undefined);
  const [userRewards, setUserRewards] = useState(undefined);

  useEffect(() => {
    const getRewards = async () => {
      const res = await getAllRewards();
      setRewards(res.rewards);
    };

    const getRewardsUser = async () => {
      const res = await getUserRewards();
      setUserRewards(res.rewards);
    };

    const getPoints = async () => {
      const res = await getUserPoints();
      setPoints(res.points);
    };

    if (!points) {
      getPoints();
    }

    if (!rewards) {
      getRewards();
    }

    if (!userRewards) {
      getRewardsUser();
    }
  }, [points, rewards, userRewards]);

  const handleRedeem = async (id) => {
    try {
      await postRedeemReward(id);
      message.success("You Redeem The Reward!");
      window.location.reload();
    } catch (error) {
      message.error("You don't have enough points : (");
      console.log(error);
    }
  };

  return (
    <div className="page--rewards">
      <section className="points-tracker">
        <div className="points-tracker-container">
          <div className="points-list">
            <PointsData
              name="Total Reward Points"
              value={points}
              unit="points"
            />
            <PointsData name="Points This Week" value={200} unit="points" />
          </div>
          <Link to="/user/activities">
            <div className="points-redirect">
              <div className="points-redirect-title">
                {" "}
                Wanna Have More Rewards?
              </div>
              <div className="points-redirect-subline">
                Start doing activities
              </div>
              <span className="points-redirect-icon">{Redirect}</span>
            </div>
          </Link>
        </div>
      </section>

      <UserCenterSection heading="Redeem Rewards" contentPadding={true}>
        <div className="giftcard-list">
          {rewards &&
            rewards.map((item) => (
              <GiftCard
                key={item.id}
                id={item.id}
                Title={item.Name}
                Description={item.Description}
                imgSrc={item.ImgURL}
                Value={item.Value}
                Points={item.Points}
                handleRedeem={handleRedeem}
              ></GiftCard>
            ))}
        </div>
      </UserCenterSection>

      <UserCenterSection heading="Your Rewards" contentPadding={true}>
        <div className="giftcard-list">
          {userRewards &&
            userRewards.map((item) => (
              <GiftCard
                key={item.id}
                id={item.id}
                Title={item.Name}
                Description={item.Description}
                imgSrc={item.ImgURL}
                Value={item.Value}
                Points={item.Points}
                Redeemed={true}
              ></GiftCard>
            ))}
        </div>
      </UserCenterSection>
    </div>
  );
};

export default Rewards;
