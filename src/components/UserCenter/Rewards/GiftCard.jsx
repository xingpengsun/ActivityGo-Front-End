import "./GiftCard.css";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Star = <FontAwesomeIcon icon={faStar} />;

const GiftCard = (props) => {
  const {
    id,
    imgSrc,
    Description,
    Title,
    Value,
    Points,
    Redeemed,
    handleRedeem,
  } = props;

  return (
    <div className="giftcard-container">
      <div className="giftcard-img-container">
        <img className="giftcard-img" src={imgSrc} alt={Description} />
      </div>
      <div className="giftcard-right">
        <div className="giftcard-text">
          <div className="giftcard-title">{Title}</div>
          <div className="giftcard-value">
            Value: <span className="giftcard-value-value">${Value}</span>
          </div>
          <div className="giftcard-description">{Description}</div>
        </div>
        <div className="giftcard-point-action-group">
          <span className="giftcard-points">
            <span className="giftcard-points-icon">{Star}</span>{" "}
            <span className="giftcard-points-value">{Points}</span>
          </span>
          {!Redeemed && (
            <Button
              type="primary"
              size="small"
              onClick={() => handleRedeem(id)}
            >
              Redeem
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
