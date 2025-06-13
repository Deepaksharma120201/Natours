import ReviewCard from "./ReviewCard";

function TourReviews({ reviews }) {
  return (
    <section className="section-reviews">
      <div className="reviews">
        {reviews.map((review, idx) => (
          <ReviewCard
            key={idx}
            user={review.user}
            text={review.text}
            rating={review.rating}
            photo={review.photo}
          />
        ))}
      </div>
    </section>
  );
}

export default TourReviews;
