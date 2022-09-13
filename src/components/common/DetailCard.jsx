import "./DetailCard.css";
import { Button } from "antd";
import { dateParser } from "../../utils";
import { FireFilled, FireOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faUserFriends,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";

const Individual = <FontAwesomeIcon icon={faUser} />;
const SmallGroup = <FontAwesomeIcon icon={faUserFriends} />;
const LargeGroup = <FontAwesomeIcon icon={faUsers} />;
const Public = <FontAwesomeIcon icon={faDoorOpen} />;

const DetailCard = (props) => {
  const {
    id,
    Name,
    Description,
    imgSrc,
    Intensity,
    Size,
    Indoor,
    StartDate,
    Location,
    WithSave,
    handleSave,
  } = props;

  const intensityIcon = [];
  for (let index = 0; index < Intensity; index++) {
    intensityIcon.push(<FireFilled key={index} />);
  }
  for (let index = Intensity; index < 5; index++) {
    intensityIcon.push(<FireOutlined key={index} />);
  }

  const activitySize = {
    1: "Individual",
    2: "Small Group",
    3: "Large Group",
    4: "Public",
  };

  return (
    <div className="detail-activity-container">
      <div className="detail-activity-tophalf">
        <div className="detail-activity-img-container">
          <img className="detail-activity-img" src={imgSrc} alt={Description} />
        </div>
        <div className="detail-activityData-right">
          <div className="detail-activityData-text">
            <div className="detail-activityData-title">{Name}</div>
            <div className="detail-activityData-info">
              <div className="detail-activityData-start">
                Date{"   "}
                <span className="detail-card-value-value">
                  {dateParser(StartDate)}
                </span>{" "}
              </div>
              <div className="detail-activityData-end">
                Ends{"   "}
                <span className="detail-card-value-value">
                  {dateParser(StartDate)}
                </span>{" "}
              </div>
              <div className="detail-activityData-intensity">
                Intensity{"   "}
                <span className="detail-card-value-value">
                  {" "}
                  {intensityIcon}
                </span>
              </div>
              <div className="detail-activityData-location">
                Location{"   "}
                <span className="detail-card-value-value">{Location}</span>{" "}
              </div>
              <div className="detail-activityData-size">
                Size{"   "}
                <span className="detail-card-value-value">
                  {" "}
                  {activitySize[Size]}
                </span>
              </div>
              <div className="detail-activityData-place">
                Place{"   "}
                <span className="detail-card-value-value">
                  {" "}
                  {Indoor ? "Indoor" : "Outdoor"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-activityData-description">
        <span className="detail-card-value-value"> {Description}</span>
      </div>
      <div className="detail-activityData-button">
        {WithSave && (
          <Button type="primary" size="small" onClick={() => handleSave(id)}>
            Save to list
          </Button>
        )}
      </div>
    </div>
  );
};

export default DetailCard;
