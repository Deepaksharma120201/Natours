function ReviewCard({ user, text, rating, photo }) {
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img className="reviews__avatar-img" src={photo} alt={user} />
        <h6 className="reviews__user">{user}</h6>
      </div>
      <p className="reviews__text">{text}</p>
      <div className="reviews__rating">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`reviews__star ${
              i < rating ? "reviews__star--active" : "reviews__star--inactive"
            }`}
          >
            <use xlinkHref="/img/icons.svg#icon-star" />
          </svg>
        ))}
      </div>
    </div>
  );
}

export default ReviewCard;
