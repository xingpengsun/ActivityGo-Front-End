import {Link} from "react-router-dom";

const Card = (props) => {
    return (
        <Link className="card-link" to={props.link}>
            <div className="card">
                <div className="card-img-container">
                    <img
                        className="card-img"
                        src={props.imgSrc}
                        alt={props.description}
                    />
                </div>
                <div className="card-text">
                    <div className="card-text-title">{props.title}</div>
                    <div className="card-text-description">{props.description}</div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
