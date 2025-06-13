function TourDescription({ paragraphs, title }) {
  paragraphs = paragraphs.split("\n");
  return (
    <div className="description-box">
      <h2 className="heading-secondary ma-bt-lg">{title}</h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="description__text">
          {p}
        </p>
      ))}
    </div>
  );
}

export default TourDescription;
