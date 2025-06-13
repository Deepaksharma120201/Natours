function QuickFacts({ date, difficulty, participants, rating }) {
  const startdate = date?.[0] ? new Date(date[0]).toLocaleDateString() : "TBD";

  return (
    <div className="overview-box__group">
      <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
      <div className="overview-box__detail">
        <svg className="overview-box__icon">
          <use xlinkHref="/img/icons.svg#icon-calendar" />
        </svg>
        <span className="overview-box__label">Next date</span>
        <span className="overview-box__text">{startdate}</span>
      </div>
      <div className="overview-box__detail">
        <svg className="overview-box__icon">
          <use xlinkHref="/img/icons.svg#icon-trending-up" />
        </svg>
        <span className="overview-box__label">Difficulty</span>
        <span className="overview-box__text">{difficulty}</span>
      </div>
      <div className="overview-box__detail">
        <svg className="overview-box__icon">
          <use xlinkHref="/img/icons.svg#icon-user" />
        </svg>
        <span className="overview-box__label">Participants</span>
        <span className="overview-box__text">{participants} people</span>
      </div>
      <div className="overview-box__detail">
        <svg className="overview-box__icon">
          <use xlinkHref="/img/icons.svg#icon-star" />
        </svg>
        <span className="overview-box__label">Rating</span>
        <span className="overview-box__text">{rating} / 5</span>
      </div>
    </div>
  );
}

export default QuickFacts;
