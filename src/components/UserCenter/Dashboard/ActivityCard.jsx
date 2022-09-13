import { Button, message } from "antd";
import UserCenterSection from "../common/UserCenterSection";
import "./ActivityCard.css";
import { dateParser } from "../../../utils";
import {
  postFinishActivity,
  postStartActivity,
} from "../../../services/request/api";

const ActivityCard = (props) => {
  const { onGoing, list } = props;

  const startActivity = async (ac_id) => {
    try {
      await postStartActivity(ac_id);
      message.success("Activity started.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const finishActivity = async (ac_id) => {
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

  return (
    <UserCenterSection
      heading={onGoing ? "Ongoing Activities" : "Activities To Do"}
      subheading={onGoing ? "Finish your activities!" : "Your saved activities"}
      more="View Details"
      moreLink="/user/activities"
    >
      <ul className="user-center-activity-list">
        {list &&
          list.map((item, index) => (
            <li key={index} className="user-center-activity-item">
              <div className="user-center-activity-item-left-wrap">
                <img
                  className="user-center-activity-image"
                  src={item.ImgURL}
                  alt={item.Name}
                ></img>
                <div className="user-center-activity-text">
                  <div className="user-center-activity-name">{item.Name}</div>
                  <div className="user-center-activity-start-time">
                    <span className="user-center-activity-description-text">
                      {onGoing ? "You Started At:" : "Begins At:"}
                    </span>
                    <span className="user-center-activity-value">
                      {"  " + dateParser(item.StartDate)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                type="primary"
                onClick={() =>
                  onGoing ? finishActivity(item.id) : startActivity(item.id)
                }
              >
                {onGoing ? "Finish" : "Start"}
              </Button>
            </li>
          ))}
      </ul>
    </UserCenterSection>
  );
};

export default ActivityCard;
