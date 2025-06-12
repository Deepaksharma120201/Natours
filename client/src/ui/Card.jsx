import icons from "../assets/img/icons.svg";

function Card({
  title,
  subtitle,
  description,
  location,
  date,
  stops,
  people,
  price,
  rating,
  reviews,
  image,
  link,
}) {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          <img src={image} alt={title} className="card__picture-img" />
        </div>
        <h3 className="heading-tertirary">
          <span>{title}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">{subtitle}</h4>
        <p className="card__text">{description}</p>
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
          <span>{people} people</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">${price}</span>
          <span className="card__footer-text">per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{rating}</span>
          <span className="card__footer-text">rating ({reviews})</span>
        </p>
        <a href={link} className="btn btn--green btn--small">
          Details
        </a>
      </div>
    </div>
  );
}

export default Card;
