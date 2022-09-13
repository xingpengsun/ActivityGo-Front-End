import "./ExerciseData.css";
import { Link } from "react-router-dom";

const ExerciseData = (props) => {
  const { name, value, unit, link } = props;
  return (
    <Link className="exercise-data" to={link}>
      <div className="exercise-data-text">
        <div className="exercise-data-title">{name}</div>
        <div className="exercise-data-content">
          <span className="exercise-data-value">{value}</span>
          <span className="exercise-data-unit">{unit}</span>
        </div>
      </div>
    </Link>
  );
};

export default ExerciseData;
