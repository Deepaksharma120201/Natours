function TourGallery({ images }) {
  return (
    <section className="section-pictures">
      {images.map((src, i) => (
        <div key={i} className="picture-box">
          <img
            className={`picture-box__img picture-box__img--${i + 1}`}
            src={`/img/tours/${src}`}
            alt={`Tour ${i + 1}`}
          />
        </div>
      ))}
    </section>
  );
}

export default TourGallery;