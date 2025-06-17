import ReviewCard from "./ReviewCard";

function TourReviews({ reviews }) {
  return (
    <section className="section-reviews">
      <div className="reviews">
        {reviews.map(
          (review, idx) => (
            (
              <ReviewCard
                key={idx}
                text={review.review}
                rating={review.rating}
                user={review.user.name}
                photo={review.user.photo}
              />
            )
          )
        )}
      </div>
    </section>
  );
}

export default TourReviews;
