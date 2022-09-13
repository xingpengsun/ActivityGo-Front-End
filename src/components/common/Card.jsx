import "./Card.css";

import React from "react";
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
} from "@fortawesome/free-solid-svg-icons";

import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { dateParser } from "../../utils";

const Individual = <FontAwesomeIcon icon={faUser} />;
const SmallGroup = <FontAwesomeIcon icon={faUserFriends} />;
const LargeGroup = <FontAwesomeIcon icon={faUsers} />;
const Public = <FontAwesomeIcon icon={faDoorOpen} />;
const IndoorIcon = <FontAwesomeIcon icon={faHome} />;
const OutdoorIcon = <FontAwesomeIcon icon={faTree} />;
const Calendar = <FontAwesomeIcon icon={faCalendarAlt} />;

const Card = (props) => {
  const {
    id,
    Name,
    Description,
    imgSrc,
    Intensity,
    Indoor,
    Size,
    StartDate,
    WithBackground,
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
    // <Link className="card-link">

    // </Link>
    <div
      className={WithBackground ? "card card-background" : "card"}
      onClick={() => handleClick(id)}
    >
      <div className="card-img-container">
        <img className="card-img" src={imgSrc} alt={Description} />
      </div>
      <div className="card-text">
        <div className="card-text-title">{Name}</div>
        <div className="card-text-detail">
          <div className="card-start-date">
            <span className="card-start-date-icon">{Calendar}</span>
            {dateParser(StartDate)}
          </div>
          <div className="card-icon-group">
            <Tooltip title={`Intensity`}>
              <span className="card-intensity">{intensityIcon}</span>
            </Tooltip>
            <div>
              <Tooltip title={`Activity Size: ${activitySize[Size]}`}>
                <span className="card-activity-size">{sizeIcon}</span>
              </Tooltip>
              <Tooltip title={`Place: ${Indoor ? "Indoor" : "Outdoor"}`}>
                <span className="card-place">{placeIcon}</span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
