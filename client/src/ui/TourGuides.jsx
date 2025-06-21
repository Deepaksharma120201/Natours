function TourGuides({ guides }) {
  return (
    <div className="overview-box__group">
      <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
      {guides.map((guide, idx) => (
        <div key={idx} className="overview-box__detail">
          <img
            className="overview-box__img"
            src={guide.photo}
            alt={guide.name}
          />
          <span className="overview-box__label">
            {guide.role == "lead-guide" ? "Lead guide" : "Tour guide"}
          </span>
          <span className="overview-box__text">{guide.name}</span>
        </div>
      ))}
    </div>
  );
}

export default TourGuides;
