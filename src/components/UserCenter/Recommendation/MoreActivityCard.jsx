import "./MoreActivityCard.css";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { FireFilled, FireOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faUserFriends,
  faTree,
  faHome,
  faDoorOpen,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import { faCalendarAlt, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { dateParser } from "../../../utils";

const Individual = <FontAwesomeIcon icon={faUser} />;
const SmallGroup = <FontAwesomeIcon icon={faUserFriends} />;
const LargeGroup = <FontAwesomeIcon icon={faUsers} />;
const Public = <FontAwesomeIcon icon={faDoorOpen} />;
const IndoorIcon = <FontAwesomeIcon icon={faHome} />;
const OutdoorIcon = <FontAwesomeIcon icon={faTree} />;
const Calendar = <FontAwesomeIcon icon={faCalendarAlt} />;
const Dislike = <FontAwesomeIcon icon={faTimesCircle} />;
const Saved = <FontAwesomeIcon icon={faBookmark} />;

const MoreActivityCard = (props) => {
  const {
    id,
    Name,
    Description,
    imgSrc,
    Intensity,
    Indoor,
    Size,
    StartDate,
    handleDislike,
    handleSave,
    handleClick,
  } = props;

  const intensityIcon = [];
  for (let index = 0; index < Intensity; index++) {
    intensityIcon.push(<FireFilled key={index} />);
  }
  for (let index = Intensity; index < 5; index++) {
    intensityIcon.push(<FireOutlined key={index} />);
  }

  let sizeIcon = undefined;
  switch (Size) {
    case 1:
      sizeIcon = Individual;
      break;
    case 2:
      sizeIcon = SmallGroup;
      break;
    case 3:
      sizeIcon = LargeGroup;
      break;
    case 4:
      sizeIcon = Public;
      break;
    default:
      break;
  }

  let placeIcon = Indoor ? IndoorIcon : OutdoorIcon;

  const activitySize = {
    1: "Individual",
    2: "Small Group",
    3: "Large Group",
    4: "Public",
  };

  return (
    <div className={`others-card others-card-background`}>
      <div className="others-card-img-container">
        <img className="others-card-img" src={imgSrc} alt={Description} />
      </div>
      <div className="others-card-text" onClick={() => handleClick(id)}>
        <div className="others-card-text-title">{Name}</div>
        <div className="others-card-text-detail">
          <div className="others-card-start-date">
            <span className="others-card-start-date-icon">{Calendar}</span>
            {dateParser(StartDate)}
          </div>
          <div className="others-card-icon-group">
            <Tooltip title={`Intensity`}>
              <span className="others-card-intensity">{intensityIcon}</span>
            </Tooltip>
            <div className="others-card-size-place">
              <Tooltip title={`Activity Size: ${activitySize[Size]}`}>
                <span className="others-card-activity-size">{sizeIcon}</span>
              </Tooltip>
              <Tooltip title={`Place: ${Indoor ? "Indoor" : "Outdoor"}`}>
                <span className="others-card-place">{placeIcon}</span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="delete-or-save">
        <Tooltip title={`Dislike`}>
          <span
            className="others-card-action-icon others-card-delete-icon"
            onClick={() => handleDislike(id)}
          >
            {Dislike}
          </span>
        </Tooltip>

        <Tooltip title={`Save Activity`}>
          <span
            className="others-card-action-icon others-card-saved-icon"
            onClick={() => handleSave(id)}
          >
            {Saved}
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default MoreActivityCard;
