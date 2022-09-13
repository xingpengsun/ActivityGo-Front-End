import "./PointsData.css";

const PointsData = (props) => {
  const { name, value, unit} = props;
  return (
    <div className="points-data">
      <div className="points-data-text">
        <div className="points-data-title">{name}</div>
        <div className="points-data-content">
          <span className="points-data-value">{value}</span>
          <span className="points-data-unit">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default PointsData;