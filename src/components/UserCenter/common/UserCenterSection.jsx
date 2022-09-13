import { Link } from "react-router-dom";
import "./UserCenterSection.css";

const UserCenterSection = (props) => {
  const { heading, subheading, more, moreLink, contentPadding } = props;
  return (
    <section className="user-center-section">
      <div className="user-center-section-heading">
        <div className="section-main-heading">{heading}</div>
        <div className="section-sub-heading">{subheading}</div>
      </div>
      {more && (
        <Link to={moreLink} className="section-more">
          <span>{more}</span>
        </Link>
      )}
      <div
        className={`section-content ${
          contentPadding && "section-content-padding"
        }`}
      >
        {props.children}
      </div>
    </section>
  );
};

export default UserCenterSection;
