function TourHero({ image, title, duration, description }) {
  return (
    <section className="section-header">
      <div className="header__hero">
        <div className="header__hero-overlay">&nbsp;</div>
        <img className="header__hero-img" src={image} alt={title} />
      </div>
      <div className="heading-box">
        <h1 className="heading-primary">
          <span>{title}</span>
        </h1>
        <div className="heading-box__group">
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use xlinkHref="/img/icons.svg#icon-clock" />
            </svg>
            <span className="heading-box__text">{duration} days</span>
          </div>
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use xlinkHref="/img/icons.svg#icon-map-pin" />
            </svg>
            <span className="heading-box__text">{description}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TourHero;
