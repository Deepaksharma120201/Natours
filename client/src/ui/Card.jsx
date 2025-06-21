import { Link } from "react-router-dom";
import icons from "/img/icons.svg";

function Card({ tour }) {
  const {
    name,
    duration,
    summary,
    startLocation,
    startDates,
    locations,
    maxGroupSize,
    price,
    ratingsAverage,
    ratingsQuantity,
    imageCover,
    slug,
  } = tour;

  const subtitle = `${duration}-day tour`;
  const location = startLocation?.description || "Unknown";
  const date = startDates?.[0]
    ? new Date(startDates[0]).toLocaleDateString()
    : "TBD";
  const stops = locations?.length || 0;
  const link = `/tour/${slug}`;

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          <img src={imageCover} alt={name} className="card__picture-img" />
        </div>
        <h3 className="heading-tertirary">
          <span>{name}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">{subtitle}</h4>
        <p className="card__text">{summary}</p>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref={`${icons}#icon-map-pin`} />
          </svg>
          <span>{location}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref={`${icons}#icon-calendar`} />
          </svg>
          <span>{date}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref={`${icons}#icon-flag`} />
          </svg>
          <span>{stops} stops</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref={`${icons}#icon-user`} />
          </svg>
          <span>{maxGroupSize} people</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">${price}</span>
          <span className="card__footer-text"> per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{ratingsAverage}</span>
          <span className="card__footer-text"> rating ({ratingsQuantity})</span>
        </p>
        <Link to={link} className="btn btn--green btn--small">
          Details
        </Link>
      </div>
    </div>
  );
}

export default Card;
