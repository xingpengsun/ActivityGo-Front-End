import "./UserCenterHeading.css";

const UserCenterHeading = (props) => {
  const { pageName, username, userAvatarUrl } = props;
  return (
    <div className="user-center-user-heading">
      <div className="user-center-page-name">{pageName}</div>
      <div className="user-center-user-info">
        <span className="username">{username}</span>
        <span className="avatar">
          <img className="avatar-img" src={userAvatarUrl} alt="User Avatar" />
        </span>
      </div>
    </div>
  );
};

export default UserCenterHeading;
