import "./Advantage.css";
import { Link } from "react-router-dom";

const Advantage = (props) => {
  return (
    <Link className="advantage-link" to={props.link}>
      <div className="advantage">
        <div className="advantage-img-container">
          <img
            className="advantage-img"
            src={props.imgSrc}
            alt={props.description}
          />
        </div>
        <div className="advantage-text">
          <div className="advantage-text-title">{props.title}</div>
          <div className="advantage-text-description">{props.description}</div>
        </div>
      </div>
    </Link>
  );
};

export default Advantage;