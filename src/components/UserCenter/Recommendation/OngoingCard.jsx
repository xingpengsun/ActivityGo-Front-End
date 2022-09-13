import "./OngoingCard.css";
import { Button } from "antd";
import { dateParser } from "../../../utils";

const OngoingCard = (props) => {
  const { id, imgSrc, Description, Title, StartDate, Duration, handleClick } =
    props;

  return (
    <div className="ongoing-activity-container" onClick={() => handleClick(id)}>
      <div className="ongoing-activity-img-container">
        <img className="ongoing-activity-img" src={imgSrc} alt={Description} />
      </div>
      <div className="ongoing-activityData-right">
        <div className="ongoing-activityData-text">
          <div className="ongoing-activityData-title">{Title}</div>
          <div className="ongoing-activityData-start">
            Begins at:{" "}
            <span className="ongoing-card-value-value">
              {dateParser(StartDate, true)}
            </span>{" "}
          </div>
          <div className="ongoing-activityData-last-for">
            Last for:{" "}
            <span className="ongoing-card-value-value">{Duration} Minutes</span>
          </div>
        </div>

        <Button type="primary" size="small">
          Finish
        </Button>
      </div>
    </div>
  );
};

export default OngoingCard;
